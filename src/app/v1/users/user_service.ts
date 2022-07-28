import { User } from "@prisma/client";
import UserRepository from "./user_repository"

interface IUserService {
    userRepository: UserRepository
    findUserById(id: string): Promise<User>
}

class UserService implements IUserService {
    userRepository = new UserRepository();
    findUserById = async (id: string) => {
        return await this.userRepository.findUserById(id)
    }

}

export default UserService;