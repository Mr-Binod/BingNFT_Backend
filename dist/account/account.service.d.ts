import { CreateAccountDto } from './dto/create-account.dto';
import { ConfigService } from '@nestjs/config';
import { SmartAccInfoEntity } from './entities/account.entity';
import { Repository } from 'typeorm';
export declare class AccountService {
    private configService;
    private readonly smartAccInfoEntity;
    constructor(configService: ConfigService, smartAccInfoEntity: Repository<SmartAccInfoEntity>);
    private readonly logger;
    private readonly provider;
    private readonly FactoryAcc;
    private readonly PayMasterAcc;
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
