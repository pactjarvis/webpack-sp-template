export interface IResultGetItem {
  Attachments?: boolean;  
  AuthorId?: number;      
  Author?: {
    Id?: number;
    Name?: string;        /* "i:0#.w|sibur\username" */
    EMail?: string;
  };
  ContentType?: object;   
  ContentTypeId?: string; /* "0x0100EC37BC75ABC4D543899A88C9CAFED7E0" */
  Created?: string;       /* "2018-04-18T05:55:11Z" */
  EditorId?: number;      
  Editor?: {
    Id?: number;
    Name?: string;        /* "i:0#.w|sibur\username" */
    EMail?: string;
  };
  FieldValuesAsHtml?: object;    
  FieldValuesAsText?: object;    
  FieldValuesForEdit?: object;    
  File?: object;    
  FileSystemObjectType?: number;    
  FirstUniqueAncestorSecurableObject?: object;    
  Folder?: object;    
  GUID?: string;          /* "d9ea09a8-96c0-4dc0-a8b9-873bb4631e6a" */    
  ID?: number;
  Id?: number;
  Modified?: string;      /* "2018-12-28T10:22:09Z" */
  ParentList?: object;
  RoleAssignments?: object;
  Title?: string;
}