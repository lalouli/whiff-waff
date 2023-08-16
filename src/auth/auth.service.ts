import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { SignUpDto } from 'src/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SuccessResponse } from 'src/shared/responses/responses.sucess-response';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import emailVlidationContent from '../shared/constants/constants.emailValidation'
import * as bcrytpt from 'bcrypt';
import * as  messages from 'src/shared/constants/constants.messages';
import * as  values from 'src/shared/constants/constants.values';
import * as os from 'os';
import * as env from 'src/shared/constants/constants.name-variables'
import * as path from 'src/shared/constants/constants.paths'

const authService = 'AuthService';
@Injectable()
export class AuthService {
	logger = new Logger(authService);
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UsersService,
		private readonly jwt: JwtService,
		private readonly mailerService: MailerService,
		private readonly config: ConfigService) { }

	async singUp(dto: SignUpDto): Promise<SuccessResponse> {
		dto.status = values.PlayerStatus.INACTIVE;
		dto.twoFactorAuth = false;
		dto.verfiedEmail = true;
		dto.avatar = "https://storage.googleapis.com/whiff-waff/default.png";
		const salt: string = await bcrytpt.genSalt(values.SALT_ROUNDS);
		dto.password = await bcrytpt.hash(dto.password, salt);
		const userInfos = await this.userService.createUser(dto);
		const email_jwt = await this.signToken(userInfos, this.config.get(env.JWT_EMAIL_SECRET),
			this.config.get(env.TOKEN_EMAIL_EXPIRATION_TIME));
		const fullName = `${dto.firstName} ${dto.lastName}`;
		await this.sendEmail(dto.email, this.config.get(env.EMAIL_SUBJECT), email_jwt, fullName);
		return new SuccessResponse(HttpStatus.CREATED, messages.SUCESSFULL_MSG);
	}

	async signToken(user: any, secretKey: string, expire: string): Promise<string> {
		const jwt = await this.jwt.signAsync(user, { secret: secretKey, expiresIn: expire });
		return (jwt);
	}

	async validateUser(receiver: string, password: string): Promise<any> {
		const user = await this.userService.findOneUser(receiver);
		if (user) {
			const expectedPassword = await bcrytpt.compare(password, user.password)
			if (expectedPassword) {
				const token = await this.signToken({ id: user.id, email: user.email, user: user.userName }, this.config.get(env.JWT_SECRET), this.config.get(env.JWT_EXPIRATION_TIME));
				const fullName = `${user.firstName} ${user.lastName}`;
				if (user.verfiedEmail == false) {
					this.sendEmail(user.email, this.config.get(env.EMAIL_SUBJECT), token, fullName);
					throw new ForbiddenException(messages.REQUIRED_VALIDATION_EMAIL);
				}
				return { statusCode: HttpStatus.OK, token: token };
			}
		}
		return (null);
	}

	async sendEmail(receiver: string, subject: string, token: any, fullName: string) {
		try {
			const hostname = os.hostname();
			const port = this.config.get(env.PORT);
			const confirmationLink: string = `${path.PROTOCOL}${hostname}${path.SEPARATOR}${port}${path.VALIDATION_EMAIL_ENDPOINT}${token}`;
			const fileContent: string = emailVlidationContent(confirmationLink, fullName);
			this.mailerService.sendMail({
				to: receiver,
				subject: subject,
				html: fileContent
			});
		} catch (error) {
			this.logger.error(error.messages)
		}
	}

	async verfyEmail(token: string): Promise<string> {
		let valid = true;
		try {
			const value = await this.jwt.verify(token, { secret: this.config.get(env.JWT_EMAIL_SECRET) });
			if (value) {
				await this.prismaService.user.update({
					where: {
						id: value.id
					},
					data: {
						verfiedEmail: true
					}
				});
			}
		} catch (error) {
			valid = false;
		}
		const loginUrl = `${path.PROTOCOL}${this.config.get(env.HOST_CLIENT)}${path.SEPARATOR}${this.config.get(env.CLIENT_PORT)}${path.REDIRECTION_ENDPOINT_VALID_EMAIL}${valid}`;
		return loginUrl;
	}

	async insertIntraUser(dto: SignUpDto) {
		try {
			let existsUser = await this.prismaService.user.findUnique({
				where: {
					email: dto.email
				}
			})
			if (!existsUser) {
				existsUser = await this.userService.createUser(dto);
			}
			const token = await this.signToken({ id: existsUser.id, email: existsUser.email, userName: existsUser.email }, this.config.get(env.JWT_SECRET), this.config.get(env.JWT_EXPIRATION_TIME));
			return (token);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}


}