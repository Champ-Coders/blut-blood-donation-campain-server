import { ITeam } from './team.interface'
import { Team } from './team.model'

const insertIntoDB = async (data: ITeam): Promise<ITeam> => {
  const result = await Team.create(data)
  return result
}

const getAllData = async (): Promise<ITeam[]> => {
  const result = await Team.find({})
  return result
}

const getSingleData = async (id: string): Promise<ITeam | null> => {
  const result = await Team.findOne({ _id: id })
  return result
}

const updateData = async (
  id: string,
  payload: Partial<ITeam>
): Promise<ITeam | null> => {
  const result = await Team.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteData = async (id: string): Promise<ITeam | null> => {
  const result = await Team.findOneAndDelete({ _id: id })
  return result
}

export const TeamService = {
  insertIntoDB,
  getAllData,
  getSingleData,
  updateData,
  deleteData,
}
