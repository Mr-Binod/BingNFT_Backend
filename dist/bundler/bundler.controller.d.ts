import { BundlerService } from './bundler.service';
import { CreateBundlerDto } from './dto/create-bundler.dto';
export declare class BundlerController {
    private readonly bundlerService;
    constructor(bundlerService: BundlerService);
    addMempool(data: CreateBundlerDto): Promise<any>;
    getMempool(): CreateBundlerDto[];
}
