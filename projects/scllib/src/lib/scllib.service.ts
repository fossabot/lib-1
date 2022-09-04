// SPDX-FileCopyrightText: 2022 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { Injectable } from '@angular/core';
/// <amd-dependency path="@opentempl/jsonix" />
import { Jsonix } from '@opentempl/jsonix';
import { Observable } from 'rxjs';
import { _SCLType } from './xmlns/SCL';

/**
 * Service Account Interface
 */
export interface SAType {
  [key: string]: _SCLType;
}

/**
 * Main Service
 */
@Injectable({
  providedIn: 'root'
})
export class ScllibService {

  /* eslint-disable @typescript-eslint/no-explicit-any */
  public context: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public marshaller: any;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public unmarshaller: any;
  
  constructor(){}

  /**
   * Init Context - Compiler
   * @param factory 
   * @param namespace 
   */
  setContext(factory: any, namespace?: any){
    if(namespace != undefined && namespace != null) {
      this.context = new Jsonix.Context([factory],namespace);
    } else {
      this.context = new Jsonix.Context([factory]); 
    }
    
    this.marshaller = this.context.createMarshaller();
    this.unmarshaller = this.context.createUnmarshaller();
    console.info('@@@@ scl-lib @@@@ context : ',this.context);
    console.info('@@@@ scl-lib @@@@ marshaller : ',this.marshaller);
    console.info('@@@@ scl-lib @@@@ unmarshaller : ',this.unmarshaller);
  }

  marshalDocument(data: any): Observable<XMLDocument> {
    console.info('@@@@ scl-lib @@@@ marshalDocument ...');
    return new Observable(observer => {
      const result = this.marshaller.marshalDocument(data);
      console.debug('@@@@ scl-lib @@@@ marshalDocument result : ',result);
      observer.next(result);
    });
  }

  unmarshalString(data: string): Observable<SAType> {
    console.info('@@@@ scl-lib @@@@ unmarshalString ...');
    return new Observable(observer => {
      const result = this.unmarshaller.unmarshalString(data);
      console.debug('@@@@ scl-lib @@@@ unmarshalString result : ',result);
      observer.next(result);
      observer.complete();
    });
  }

  unmarshalURL(capabilitiesUrl: any): Observable<SAType> {
    console.info('@@@@ scl-lib @@@@ unmarshalURL ...');
    return new Observable(observer => {
      this.unmarshaller.unmarshalURL(capabilitiesUrl, (result: any) => {
        console.debug('@@@@ scl-lib @@@@ unmarshalURL result : ',result);
        observer.next(result);
        observer.complete();
      });
    });
  }

}
