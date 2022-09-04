// SPDX-FileCopyrightText: 2022 Samir Romdhani <samir.romdhani1994@gmail.com>
//
// SPDX-License-Identifier: MIT license

import { TestBed } from '@angular/core/testing';
import { _SCLType } from '@Model/SCL';
import { ScllibService } from './scllib.service';
import * as ServiceAccount from '../tests/mappings/SA.js';

describe('ScllibService', () => {
  let service: ScllibService;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const namespaces: any = {
    namespacePrefixes: {
      "http://www.iec.ch/61850/2003/SCL": "",
      "http://www.w3.org/2001/XMLSchema": "xs"
    },
    mappingStyle : "simplified"
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ScllibService ]
    });
    service = TestBed.inject(ScllibService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('ScllibService - Compiler', () => {
    beforeEach(() => {
      service.setContext(ServiceAccount.SA, namespaces);
    });
    it('compiler should be created # Context', () => {
      expect(service.context).not.toBeNull();
    });
    it('compiler should be created # Module', () => {
      expect(service.context.modules.length).toEqual(1);
      expect(service.context.modules[0].name).toEqual('SA');
      expect(service.context.modules[0].defaultElementNamespaceURI).toEqual("http://www.iec.ch/61850/2003/SCL");
      expect(service.context.modules[0].targetNamespace).toEqual("http://www.iec.ch/61850/2003/SCL");
    });

    it('compiler should be created # Element Infos', () => {
      expect(service.context.elementInfos).not.toBeNull();
    });
    it('compiler should be created # Namespaces', () => {
      expect(service.context.namespacePrefixes).toEqual(namespaces.namespacePrefixes);
    });
  });

  describe('ScllibService - Marshaller', () => {
    beforeEach(() => {
      service.setContext(ServiceAccount.SA, namespaces);
    });
    it('marshaller should be created', () => {
      expect(service.marshaller).toBeDefined()
    });
    it('marshalDocument should be created', () => {
      const input: _SCLType = {
        release: 4,
        revision: 'B',
        version: '2007',
        header: {
          id: "4f7752f4-b1c1-4d56-8d66-614e4da7cfbf",
          version: '1',
          revision: '1',
          toolID: "openTemplate",
          _exists: false,
          _namespace: ''
        },
        _exists: false,
        _namespace: ''
      };
      const output  = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2007" revision="B" release="4"><Header id="4f7752f4-b1c1-4d56-8d66-614e4da7cfbf" version="1" revision="1" toolID="openTemplate"/></SCL>`;
      const result = service.marshaller.marshalDocument({SCL: input});
      expect(new XMLSerializer().serializeToString(result))
      .toEqual(output);
    });
  });

  describe('ScllibService - unmarshal', () => {
    beforeEach(() => {
      service.setContext(ServiceAccount.SA, namespaces);
    });
    it('unmarshaller should be created', () => {
      expect(service.unmarshaller).toBeDefined();
      // const list : any[] = service.unmarshaller.context.elementInfos;
      // const elements : any[] = list.map((e)=> e.elementName)
      // const localParts : any[] = elements.map((e)=> e.localPart)
      // const keys : any[] = elements.map((e)=> e.key)
      // expect(localParts).toBeNull()
    });
    it('unmarshalString should be created', () => {
      const input  = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2007" revision="B" release="4"><Header id="4f7752f4-b1c1-4d56-8d66-614e4da7cfbf" version="version0001" revision="revision001" toolID="openTemplate"/></SCL>`;

      const output: any = {
        "TYPE_NAME": "SA.SCL",
        release: 4,
        revision: 'B',
        version: '2007',
        header: {
          "TYPE_NAME": "SA.THeader",
          id: "4f7752f4-b1c1-4d56-8d66-614e4da7cfbf",
          version: "version0001",
          revision: "revision001",
          toolID: "openTemplate",
        },
        otherAttributes: {
          release: '4',
          revision: 'B',
          version: '2007',
          "xmlns": "http://www.iec.ch/61850/2003/SCL",
         "xmlns:xs": "http://www.w3.org/2001/XMLSchema"
        }
      };
   
      const result = service.unmarshaller.unmarshalString(input);
      expect(result.SCL).toEqual(output);
    });

    // TODO
    it('unmarshalURL should be created', () => {
    });
  });

  describe('ScllibService - Services', () => {
    const scllibService: ScllibService= new ScllibService();
    beforeEach(() => {
      scllibService.setContext(ServiceAccount.SA, namespaces);
    });
    it('Context marshaller & unmarshaller should be created', () => {
      expect(scllibService.context).not.toBeNull();
      expect(scllibService.marshaller).toBeDefined()
      expect(scllibService.unmarshaller).toBeDefined()
    });
    it('marshalDocument test', ((done) => {
      const input: _SCLType = {
        release: 4,
        revision: 'B',
        version: '2007',
        header: {
          id: "id",
          version: '1',
          revision: '1',
          _exists: false,
          _namespace: ''
        },
        ied: [],
        _exists: false,
        _namespace: ''
      };
      const expected = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2007" revision="B" release="4"><Header id="id" version="1" revision="1"/></SCL>`;

      scllibService.marshalDocument({SCL: input}).subscribe((res) =>{
        expect(new XMLSerializer().serializeToString(res)).toEqual(expected);
        done();
      })
    }));

    it('unmarshalString test', ((done) => {
      const input  = `<SCL xmlns="http://www.iec.ch/61850/2003/SCL" xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2007" revision="B" release="4"><Header id="4f7752f4-b1c1-4d56-8d66-614e4da7cfbf" version="version0001" revision="revision001" toolID="openTemplate"/></SCL>`;
      const expected: any = {
        "TYPE_NAME": "SA.SCL",
        release: 4,
        revision: 'B',
        version: '2007',
        header: {
          "TYPE_NAME": "SA.THeader",
          id: "4f7752f4-b1c1-4d56-8d66-614e4da7cfbf",
          version: "version0001",
          revision: "revision001",
          toolID: "openTemplate",
        },
        otherAttributes: {
          release: '4',
          revision: 'B',
          version: '2007',
          "xmlns": "http://www.iec.ch/61850/2003/SCL",
         "xmlns:xs": "http://www.w3.org/2001/XMLSchema"
        }
      };

      scllibService.unmarshalString(input).subscribe((res) =>{
        expect(res).toEqual({SCL: expected});
        done();
      })
    }));

    // TODO
    it('unmarshalURL test', () => {
    });
  });
});
