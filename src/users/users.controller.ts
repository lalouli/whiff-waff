import { Controller, Get, HttpException, HttpStatus, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiHeader, ApiTags } from "@nestjs/swagger";
import { Request } from "express";

@ApiTags('users')
@Controller("users")
export class UsersController {

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @Get('me')
    getUniqueUser(@Req() req: Request) {
        return (req.user);
    }

}