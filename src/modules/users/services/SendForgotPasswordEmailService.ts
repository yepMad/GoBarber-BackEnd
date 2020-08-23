import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import User from '../infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: Request): Promise<void> {
    const checkUsersExists = await this.usersRepository.findByEmail(email);

    if (!checkUsersExists) {
      throw new AppError('User does not exists.');
    }

    this.mailProvider.sendMail(email, 'Sua recuperação');
  }
}

export default SendForgotPasswordEmailService;
