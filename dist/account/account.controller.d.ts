import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
export declare class AccountController {
    private readonly accountService;
    constructor(accountService: AccountService);
    createAcc(data: CreateAccountDto): Promise<{
        state: number;
        message: string;
    }>;
    getFindAll(): Promise<any>;
    getFindOne(user: string): Promise<{
        state: number;
        message: any;
    }>;
}
