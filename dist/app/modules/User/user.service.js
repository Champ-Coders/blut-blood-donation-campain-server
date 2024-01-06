"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiErrors_1 = __importDefault(require("../../../errors/ApiErrors"));
const user_constant_1 = require("./user.constant");
const user_modal_1 = require("./user.modal");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNumber = yield user_modal_1.User.findOne({ phoneNumber: user.phoneNumber });
    const checkEmail = yield user_modal_1.User.findOne({ email: user.email });
    if (checkEmail) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Already used this email!!!');
    }
    if (checkNumber) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Already used this phone number!!!');
    }
    const createdUser = yield user_modal_1.User.create(user);
    if (!createdUser) {
        throw new ApiErrors_1.default(400, 'Failed to create user!');
    }
    const result = yield user_modal_1.User.findById(createdUser._id);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'INTERNAL_SERVER_ERROR, Please try again later!!!');
    }
    const tokenInfo = {
        id: createdUser.id,
        email: user.email,
        role: 'user',
        imgUrl: user.imgUrl,
    };
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(tokenInfo, config_1.default.jwt.jwt_secret, config_1.default.jwt.access_token_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(tokenInfo, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return { userInfo: result, accessToken, refreshToken };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExist = yield user_modal_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, "User doesn't exist.");
    }
    if (!(yield user_modal_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect.');
    }
    const { role, id, imgUrl } = isUserExist;
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id, email, role, imgUrl }, config_1.default.jwt.jwt_secret, config_1.default.jwt.access_token_expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id, email, role, imgUrl }, config_1.default.jwt.refresh_token_secret, config_1.default.jwt.refresh_token_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token_secret);
    }
    catch (err) {
        throw new ApiErrors_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { email } = verifiedToken;
    const isUserExist = yield user_modal_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    //generate new token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: isUserExist.id,
        email: isUserExist.email,
        role: isUserExist.role,
        imgUrl: isUserExist.imgUrl,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.access_token_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
const myProfile = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modal_1.User.findById(userInfo.id).select('+notification');
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Your profile is not exist!!!');
    }
    return result;
});
const updateProfile = (payload, userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_modal_1.User.findById(userInfo.id);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // if (payload.phoneNumber) {
    //   const checkNumber = await User.findOne({
    //     phoneNumber: payload.phoneNumber,
    //   })
    //   if (checkNumber) {
    //     throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!')
    //   }
    // }
    const result = yield user_modal_1.User.findOneAndUpdate({ _id: userInfo.id }, payload, {
        new: true,
    });
    return result;
});
const changePassword = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    const isUserExist = yield user_modal_1.User.findById(userInfo.id).select({
        password: true,
    });
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (!(yield user_modal_1.User.isPasswordMatched(oldPassword, isUserExist.password))) {
        throw new ApiErrors_1.default(http_status_1.default.UNAUTHORIZED, 'Old Password is incorrect');
    }
    isUserExist.password = newPassword;
    isUserExist.save();
});
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_modal_1.User.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_modal_1.User.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getIndividualGroupUsers = (bloodGroup, filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    // for blood Group filter
    andConditions.push({
        $and: [{ bloodGroup: bloodGroup }],
    });
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: user_constant_1.userFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_modal_1.User.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_modal_1.User.countDocuments(query);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_modal_1.User.findById(id);
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    return result;
});
const forgetPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findOne({ email: email });
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    const tokenInfo = {
        id: user.id,
        email: user.email,
        role: user.role,
    };
    const token = jwtHelpers_1.jwtHelpers.createToken(tokenInfo, config_1.default.jwt.jwt_secret, '5m');
    const link = `http://localhost:5000/api/v1/users/reset-password/${user.id}/${token}`;
    console.log(link);
    return link;
});
const resetPassword = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(id);
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.jwt_secret);
    // need to work
    return 'link';
});
const changeRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_modal_1.User.findById(id);
    if (!user) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'User is not exist!!!');
    }
    const role = user.role;
    let changingRole;
    if (role == 'admin') {
        changingRole = 'user';
    }
    else
        changingRole = 'admin';
    const result = yield user_modal_1.User.findByIdAndUpdate({ _id: id }, { role: changingRole }, { new: true });
    if (!result) {
        throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Something went wrong!!!');
    }
    return result;
});
const updateProfileByAdmin = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_modal_1.User.findById(id);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (payload.phoneNumber) {
        const checkNumber = yield user_modal_1.User.findOne({
            phoneNumber: payload.phoneNumber,
        });
        if (checkNumber) {
            throw new ApiErrors_1.default(http_status_1.default.CONFLICT, 'Already used this number!!!');
        }
    }
    const result = yield user_modal_1.User.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteProfileByAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield user_modal_1.User.findById(id);
    if (!isUserExist) {
        throw new ApiErrors_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    const result = yield user_modal_1.User.findByIdAndDelete(id);
    return result;
});
exports.UserService = {
    createUser,
    loginUser,
    refreshToken,
    myProfile,
    updateProfile,
    changePassword,
    getAllUsers,
    getIndividualGroupUsers,
    getSingleUser,
    forgetPassword,
    changeRole,
    updateProfileByAdmin,
    deleteProfileByAdmin,
    resetPassword,
};
