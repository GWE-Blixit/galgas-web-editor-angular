import { Injectable } from '@angular/core';
import * as faker from 'faker';

@Injectable()
export class FakerDecorator {
    static getFaker() {
        return faker;
    }
}