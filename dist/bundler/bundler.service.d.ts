import { CreateBundlerDto } from './dto/create-bundler.dto';
import { ConfigService } from '@nestjs/config';
export declare class BundlerService {
    private configService;
    private readonly logger;
    private readonly provider;
    private mempool;
    private paymasterWallet;
    private PayMasterEntryPoint;
    private privateKey;
    constructor(configService: ConfigService);
    addMempool(userop: CreateBundlerDto): Promise<{
        state: number;
        message: string;
    }>;
    getMempool(): CreateBundlerDto[];
    private toTuple;
    private startProcessingLoop;
    private processMempool;
}
