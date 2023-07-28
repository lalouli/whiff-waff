import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-42";

@Injectable()
export class FourtyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor() {
        super({
            clientID: 'u-s4t2ud-82573d757bf7f76ec64fd426f2b6956cca48fda1f72cb2028a189dedcc8715f0',
            clientSecret: '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',
            callbackURL: 'http://localhost:3000/api/v1/auth/signin/42',
            profileFields: {
                'username': 'username',
                'name.familyName': 'lastName',
                'name.givenName': 'firstName',
                'emails.0.value': 'email',
                'photos.0.value': 'image_url'
            }
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
        try {
            console.log(profile);
            return (profile);
        } catch (error) {
            console.log('error : ', error);
        }
    }
}