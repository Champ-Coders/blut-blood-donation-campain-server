"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const banner_routes_1 = require("../modules/banner/banner.routes");
const blog_routes_1 = require("../modules/blog/blog.routes");
const faqs_routes_1 = require("../modules/faqs/faqs.routes");
const donation_route_1 = require("../modules/Donor/donation.route");
const blogComment_routes_1 = require("../modules/blogComment/blogComment.routes");
const chat_route_1 = require("../modules/chat/chat.route");
const contact_routes_1 = require("../modules/contact/contact.routes");
const event_routes_1 = require("../modules/event/event.routes");
const notification_routes_1 = require("../modules/notification/notification.routes");
const receive_route_1 = require("../modules/receive/receive.route");
const review_routes_1 = require("../modules/review/review.routes");
const services_routes_1 = require("../modules/services/services.routes");
const volunteers_routes_1 = require("../modules/volunteers/volunteers.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/banner',
        route: banner_routes_1.BannerRoutes,
    },
    {
        path: '/faqs',
        route: faqs_routes_1.FaqsRoutes,
    },
    {
        path: '/blog',
        route: blog_routes_1.BlogRoutes,
    },
    {
        path: '/donation',
        route: donation_route_1.DonationRoutes,
    },
    {
        path: '/services',
        route: services_routes_1.ServicesRoutes,
    },
    {
        path: '/event',
        route: event_routes_1.EventRoutes,
    },
    {
        path: '/review',
        route: review_routes_1.ReviewRoutes,
    },
    {
        path: '/volunteer',
        route: volunteers_routes_1.VolunteersRoutes,
    },
    {
        path: '/blog-comment',
        route: blogComment_routes_1.BlogCommentRoutes,
    },
    {
        path: '/receive',
        route: receive_route_1.ReceiveRoutes,
    },
    {
        path: '/contact',
        route: contact_routes_1.ContactRoutes,
    },
    {
        path: '/chat',
        route: chat_route_1.ChatRoutes,
    },
    {
        path: '/notification',
        route: notification_routes_1.NotificationRoutes,
    },
];
moduleRoutes.forEach(route => {
    router.use(route.path, route.route);
});
exports.default = router;
