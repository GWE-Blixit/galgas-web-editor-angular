import { FakerDecorator } from '../utils/faker-decorator';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
    protected faker = FakerDecorator.getFaker();

    constructor(
        protected http: HttpClient
    ) {

    }

    async synchronize(callback) {
        return await callback();
    }

    authentify() {
        //
    }
}