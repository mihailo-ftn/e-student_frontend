import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Class = {
  __typename?: 'Class';
  classLabel: Scalars['Int'];
  id: Scalars['String'];
  sudents: Student;
};

export type ClassInput = {
  classLabel: Scalars['Int'];
};

export type Exam = {
  __typename?: 'Exam';
  date: Scalars['DateTime'];
  exPeriodID?: Maybe<Scalars['String']>;
  examRecord?: Maybe<ExamRecord>;
  examinationPeriod?: Maybe<ExaminationPeriod>;
  id: Scalars['String'];
  subject: Subject;
  subjectID?: Maybe<Scalars['String']>;
};

export type ExamInput = {
  date: Scalars['DateTime'];
  exPeriodID?: InputMaybe<Scalars['String']>;
  subjectID: Scalars['String'];
};

export type ExamRecord = {
  __typename?: 'ExamRecord';
  exam: Exam;
  examID?: Maybe<Scalars['String']>;
  examId: Scalars['String'];
  grade: Grade;
  gradeID?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  passed: Scalars['Boolean'];
  points: Scalars['Float'];
  singed: Scalars['Boolean'];
  student?: Maybe<Student>;
  studentID?: Maybe<Scalars['String']>;
};

export type ExaminationPeriod = {
  __typename?: 'ExaminationPeriod';
  active?: Maybe<Scalars['Boolean']>;
  beginningDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  exams: Array<Exam>;
  id: Scalars['String'];
  modul?: Maybe<Modul>;
  modulID?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type ExaminationPeriodInput = {
  beginningDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  modulID: Scalars['String'];
  name: Scalars['String'];
};

export type Grade = {
  __typename?: 'Grade';
  exam: ExamRecord;
  id: Scalars['String'];
  value: Scalars['Int'];
};

export type GradeInput = {
  value: Scalars['Int'];
};

export type Modul = {
  __typename?: 'Modul';
  id: Scalars['String'];
  moduleCode: Scalars['String'];
  moduleName: Scalars['String'];
  students?: Maybe<Array<Student>>;
};

export type ModulInput = {
  moduleCode: Scalars['String'];
  moduleName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addExam: Exam;
  createClass: Class;
  createExaminationPeriod: ExaminationPeriod;
  createGrade: Grade;
  createModul: Modul;
  createPost: Post;
  createProfessor: Professor;
  createStudent: Student;
  createSubject: Subject;
  deregisterExam: Scalars['Boolean'];
  login: Student;
  loginAdmin: Scalars['Boolean'];
  loginProfessor: Professor;
  logout: Scalars['Boolean'];
  registerExam: Scalars['Boolean'];
  registerPassedExam: Scalars['Boolean'];
  updateEmail: Scalars['Boolean'];
  updatePassword: Scalars['Boolean'];
};


export type MutationAddExamArgs = {
  input: ExamInput;
};


export type MutationCreateClassArgs = {
  input: ClassInput;
};


export type MutationCreateExaminationPeriodArgs = {
  input: ExaminationPeriodInput;
};


export type MutationCreateGradeArgs = {
  input: GradeInput;
};


export type MutationCreateModulArgs = {
  input: ModulInput;
};


export type MutationCreatePostArgs = {
  input: PostInput;
};


export type MutationCreateProfessorArgs = {
  input: ProfessorInput;
};


export type MutationCreateStudentArgs = {
  input: StudentInput;
};


export type MutationCreateSubjectArgs = {
  input: SubjectInput;
};


export type MutationDeregisterExamArgs = {
  examID: Scalars['String'];
};


export type MutationLoginArgs = {
  brind: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginAdminArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationLoginProfessorArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterExamArgs = {
  examID: Scalars['String'];
};


export type MutationRegisterPassedExamArgs = {
  id: Scalars['String'];
  points: Scalars['Float'];
};


export type MutationUpdateEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdatePasswordArgs = {
  pass: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  creationDate: Scalars['DateTime'];
  creator: Professor;
  creatorID?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  important?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
};

export type PostInput = {
  creationDate: Scalars['DateTime'];
  important?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
};

export type Professor = {
  __typename?: 'Professor';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  jmbg: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: Role;
  subjects?: Maybe<Array<Subject>>;
};

export type ProfessorInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  jmbg: Scalars['String'];
  lastName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  ExamRecordFromId: ExamRecord;
  averageGrade: Scalars['Float'];
  currentExPeriod: ExaminationPeriod;
  examsFromCurrentExamPeriod: Array<Exam>;
  examsFromExaminationPeriod: ExaminationPeriod;
  getAllEXP: Array<ExaminationPeriod>;
  getAllExams: Array<ExamRecord>;
  getAllModuls: Array<Modul>;
  getAllPosts: Array<Post>;
  getAllProfessors: Array<Professor>;
  getClasses: Array<Class>;
  getGrades: Array<Grade>;
  getImportant: Array<Post>;
  getStudents: Array<Student>;
  getSubject: Subject;
  getSubjects: Array<Subject>;
  isActive: Scalars['Boolean'];
  me: Student;
  meProfessor: Professor;
  modulSubjects: Array<Subject>;
  passedExams: Array<ExamRecord>;
  professorExams: Array<Exam>;
  professorSubjects: Array<Subject>;
  registeredExams: Array<ExamRecord>;
  studentsForModul: Array<Student>;
  studentsSubjects: Array<Subject>;
  studentsWhoSingedExam: Array<ExamRecord>;
  subjectsForParticularModule: Array<Subject>;
  sumESPP: Scalars['Int'];
};


export type QueryExamRecordFromIdArgs = {
  id: Scalars['String'];
};


export type QueryGetSubjectArgs = {
  id: Scalars['String'];
};


export type QueryIsActiveArgs = {
  id: Scalars['String'];
};


export type QueryModulSubjectsArgs = {
  id: Scalars['String'];
};


export type QueryStudentsForModulArgs = {
  moduleName: Scalars['String'];
};


export type QueryStudentsWhoSingedExamArgs = {
  subjectID: Scalars['String'];
};


export type QuerySubjectsForParticularModuleArgs = {
  moduleName: Scalars['String'];
};

export enum Role {
  Admin = 'ADMIN',
  Professor = 'PROFESSOR',
  Student = 'STUDENT'
}

export type Student = {
  __typename?: 'Student';
  birthDate: Scalars['DateTime'];
  brind: Scalars['String'];
  class: Scalars['String'];
  classID: Scalars['String'];
  email: Scalars['String'];
  exams: ExamRecord;
  firstName: Scalars['String'];
  id: Scalars['String'];
  jmbg: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  modul?: Maybe<Modul>;
  modulID: Scalars['String'];
  password: Scalars['String'];
  role: Role;
};

export type StudentInput = {
  birthDate: Scalars['DateTime'];
  brind: Scalars['String'];
  classNumber: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  jmbg: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  moduleCode: Scalars['String'];
};

export type Subject = {
  __typename?: 'Subject';
  espp: Scalars['Int'];
  exam: Exam;
  id: Scalars['String'];
  modul: Modul;
  modulID: Scalars['String'];
  professor: Professor;
  professorID: Scalars['String'];
  subjectName: Scalars['String'];
  type: SubjectType;
};

export type SubjectInput = {
  espp: Scalars['Int'];
  modulID: Scalars['String'];
  professorID: Scalars['String'];
  subjectName: Scalars['String'];
  type: SubjectType;
};

export enum SubjectType {
  Elective = 'ELECTIVE',
  Required = 'REQUIRED'
}

export type CreateClassMutationVariables = Exact<{
  input: ClassInput;
}>;


export type CreateClassMutation = { __typename?: 'Mutation', createClass: { __typename?: 'Class', id: string, classLabel: number } };

export type CreateExaminationPeriodMutationVariables = Exact<{
  input: ExaminationPeriodInput;
}>;


export type CreateExaminationPeriodMutation = { __typename?: 'Mutation', createExaminationPeriod: { __typename?: 'ExaminationPeriod', name: string, beginningDate: any, endDate: any, modulID?: string | null | undefined } };

export type CreateModulMutationVariables = Exact<{
  input: ModulInput;
}>;


export type CreateModulMutation = { __typename?: 'Mutation', createModul: { __typename?: 'Modul', id: string, moduleName: string, moduleCode: string } };

export type CreateStudentMutationVariables = Exact<{
  input: StudentInput;
}>;


export type CreateStudentMutation = { __typename?: 'Mutation', createStudent: { __typename?: 'Student', id: string } };

export type CreatSubjectMutationVariables = Exact<{
  input: SubjectInput;
}>;


export type CreatSubjectMutation = { __typename?: 'Mutation', createSubject: { __typename?: 'Subject', subjectName: string, espp: number, modulID: string, professorID: string, type: SubjectType } };

export type LoginAdminMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginAdminMutation = { __typename?: 'Mutation', loginAdmin: boolean };

export type CreatePostMutationVariables = Exact<{
  input: PostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, creationDate: any, creatorID?: string | null | undefined, text?: string | null | undefined, important?: boolean | null | undefined } };

export type LoginMutationVariables = Exact<{
  brind: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Student', id: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type AddExamMutationVariables = Exact<{
  input: ExamInput;
}>;


export type AddExamMutation = { __typename?: 'Mutation', addExam: { __typename?: 'Exam', id: string, date: any } };

export type LoginProfessorMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginProfessorMutation = { __typename?: 'Mutation', loginProfessor: { __typename?: 'Professor', id: string, firstName: string, lastName: string, email: string, password: string, jmbg: string, role: Role } };

export type DeregisterMutationVariables = Exact<{
  examID: Scalars['String'];
}>;


export type DeregisterMutation = { __typename?: 'Mutation', deregisterExam: boolean };

export type RegisterExamMutationVariables = Exact<{
  examID: Scalars['String'];
}>;


export type RegisterExamMutation = { __typename?: 'Mutation', registerExam: boolean };

export type RegisterPassedExamMutationVariables = Exact<{
  id: Scalars['String'];
  points: Scalars['Float'];
}>;


export type RegisterPassedExamMutation = { __typename?: 'Mutation', registerPassedExam: boolean };

export type UpdateEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type UpdateEmailMutation = { __typename?: 'Mutation', updateEmail: boolean };

export type UpdatePasswordMutationVariables = Exact<{
  pass: Scalars['String'];
}>;


export type UpdatePasswordMutation = { __typename?: 'Mutation', updatePassword: boolean };

export type GetAllPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: string, creationDate: any, creatorID?: string | null | undefined, text?: string | null | undefined, creator: { __typename?: 'Professor', firstName: string, lastName: string } }> };

export type ImportantQueryVariables = Exact<{ [key: string]: never; }>;


export type ImportantQuery = { __typename?: 'Query', getImportant: Array<{ __typename?: 'Post', id: string, creationDate: any, creatorID?: string | null | undefined, text?: string | null | undefined, important?: boolean | null | undefined, creator: { __typename?: 'Professor', id: string, firstName: string, lastName: string } }> };

export type ExamRecordFromIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExamRecordFromIdQuery = { __typename?: 'Query', ExamRecordFromId: { __typename?: 'ExamRecord', id: string, student?: { __typename?: 'Student', firstName: string, lastName: string, brind: string } | null | undefined, exam: { __typename?: 'Exam', subject: { __typename?: 'Subject', subjectName: string } } } };

export type ExamsFromCurrentExamPeriodQueryVariables = Exact<{ [key: string]: never; }>;


export type ExamsFromCurrentExamPeriodQuery = { __typename?: 'Query', examsFromCurrentExamPeriod: Array<{ __typename?: 'Exam', date: any, subject: { __typename?: 'Subject', id: string, subjectName: string, espp: number, type: SubjectType }, examRecord?: { __typename?: 'ExamRecord', student?: { __typename?: 'Student', firstName: string, lastName: string, brind: string } | null | undefined } | null | undefined }> };

export type GetAllModulsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllModulsQuery = { __typename?: 'Query', getAllModuls: Array<{ __typename?: 'Modul', id: string, moduleName: string, moduleCode: string }> };

export type GetAllProfessorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProfessorsQuery = { __typename?: 'Query', getAllProfessors: Array<{ __typename?: 'Professor', id: string, firstName: string, lastName: string }> };

export type CurrentExPeriodQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentExPeriodQuery = { __typename?: 'Query', currentExPeriod: { __typename?: 'ExaminationPeriod', id: string, name: string, beginningDate: any, endDate: any, modulID?: string | null | undefined, active?: boolean | null | undefined, exams: Array<{ __typename?: 'Exam', subject: { __typename?: 'Subject', subjectName: string } }> } };

export type GetSubjectQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSubjectQuery = { __typename?: 'Query', getSubject: { __typename?: 'Subject', id: string, subjectName: string } };

export type MeProfessorQueryVariables = Exact<{ [key: string]: never; }>;


export type MeProfessorQuery = { __typename?: 'Query', meProfessor: { __typename?: 'Professor', id: string, firstName: string, lastName: string, email: string, password: string, jmbg: string, role: Role } };

export type ProfessorExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfessorExamsQuery = { __typename?: 'Query', professorExams: Array<{ __typename?: 'Exam', id: string, date: any, subject: { __typename?: 'Subject', id: string, subjectName: string, type: SubjectType, espp: number } }> };

export type ProfessorSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfessorSubjectsQuery = { __typename?: 'Query', professorSubjects: Array<{ __typename?: 'Subject', id: string, subjectName: string, espp: number, modulID: string, type: SubjectType, modul: { __typename?: 'Modul', moduleName: string, moduleCode: string } }> };

export type StudentsWhoSingedExamQueryVariables = Exact<{
  subjectID: Scalars['String'];
}>;


export type StudentsWhoSingedExamQuery = { __typename?: 'Query', studentsWhoSingedExam: Array<{ __typename?: 'ExamRecord', id: string, exam: { __typename?: 'Exam', subject: { __typename?: 'Subject', subjectName: string } }, student?: { __typename?: 'Student', id: string, firstName: string, lastName: string, brind: string } | null | undefined }> };

export type AverageGradeQueryVariables = Exact<{ [key: string]: never; }>;


export type AverageGradeQuery = { __typename?: 'Query', averageGrade: number };

export type EspbQueryVariables = Exact<{ [key: string]: never; }>;


export type EspbQuery = { __typename?: 'Query', sumESPP: number };

export type ExamsFromExaminationPeriodQueryVariables = Exact<{ [key: string]: never; }>;


export type ExamsFromExaminationPeriodQuery = { __typename?: 'Query', examsFromExaminationPeriod: { __typename?: 'ExaminationPeriod', id: string, name: string, beginningDate: any, endDate: any, exams: Array<{ __typename?: 'Exam', id: string, date: any, examRecord?: { __typename?: 'ExamRecord', id: string, studentID?: string | null | undefined, singed: boolean } | null | undefined, subject: { __typename?: 'Subject', subjectName: string, espp: number, type: SubjectType, professor: { __typename?: 'Professor', firstName: string, lastName: string } } }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'Student', id: string, email: string, firstName: string, middleName: string, lastName: string, jmbg: string, brind: string, birthDate: any, role: Role } };

export type PassedExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type PassedExamsQuery = { __typename?: 'Query', passedExams: Array<{ __typename?: 'ExamRecord', points: number, passed: boolean, grade: { __typename?: 'Grade', value: number }, exam: { __typename?: 'Exam', date: any, examinationPeriod?: { __typename?: 'ExaminationPeriod', name: string } | null | undefined, subject: { __typename?: 'Subject', subjectName: string, espp: number, type: SubjectType, professor: { __typename?: 'Professor', firstName: string, lastName: string } } } }> };

export type RegisteredExamsQueryVariables = Exact<{ [key: string]: never; }>;


export type RegisteredExamsQuery = { __typename?: 'Query', registeredExams: Array<{ __typename?: 'ExamRecord', id: string, exam: { __typename?: 'Exam', id: string, date: any, subject: { __typename?: 'Subject', espp: number, subjectName: string, type: SubjectType, professor: { __typename?: 'Professor', firstName: string, lastName: string } } } }> };

export type StudentsSubjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type StudentsSubjectsQuery = { __typename?: 'Query', studentsSubjects: Array<{ __typename?: 'Subject', id: string, subjectName: string, espp: number, type: SubjectType }> };


export const CreateClassDocument = gql`
    mutation CreateClass($input: ClassInput!) {
  createClass(input: $input) {
    id
    classLabel
  }
}
    `;

export function useCreateClassMutation() {
  return Urql.useMutation<CreateClassMutation, CreateClassMutationVariables>(CreateClassDocument);
};
export const CreateExaminationPeriodDocument = gql`
    mutation CreateExaminationPeriod($input: ExaminationPeriodInput!) {
  createExaminationPeriod(input: $input) {
    name
    beginningDate
    endDate
    modulID
  }
}
    `;

export function useCreateExaminationPeriodMutation() {
  return Urql.useMutation<CreateExaminationPeriodMutation, CreateExaminationPeriodMutationVariables>(CreateExaminationPeriodDocument);
};
export const CreateModulDocument = gql`
    mutation CreateModul($input: ModulInput!) {
  createModul(input: $input) {
    id
    moduleName
    moduleCode
  }
}
    `;

export function useCreateModulMutation() {
  return Urql.useMutation<CreateModulMutation, CreateModulMutationVariables>(CreateModulDocument);
};
export const CreateStudentDocument = gql`
    mutation CreateStudent($input: StudentInput!) {
  createStudent(input: $input) {
    id
  }
}
    `;

export function useCreateStudentMutation() {
  return Urql.useMutation<CreateStudentMutation, CreateStudentMutationVariables>(CreateStudentDocument);
};
export const CreatSubjectDocument = gql`
    mutation CreatSubject($input: SubjectInput!) {
  createSubject(input: $input) {
    subjectName
    espp
    modulID
    professorID
    type
  }
}
    `;

export function useCreatSubjectMutation() {
  return Urql.useMutation<CreatSubjectMutation, CreatSubjectMutationVariables>(CreatSubjectDocument);
};
export const LoginAdminDocument = gql`
    mutation LoginAdmin($password: String!, $email: String!) {
  loginAdmin(password: $password, email: $email)
}
    `;

export function useLoginAdminMutation() {
  return Urql.useMutation<LoginAdminMutation, LoginAdminMutationVariables>(LoginAdminDocument);
};
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
  createPost(input: $input) {
    id
    creationDate
    creatorID
    text
    important
  }
}
    `;

export function useCreatePostMutation() {
  return Urql.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument);
};
export const LoginDocument = gql`
    mutation Login($brind: String!, $password: String!) {
  login(brind: $brind, password: $password) {
    id
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const AddExamDocument = gql`
    mutation AddExam($input: ExamInput!) {
  addExam(input: $input) {
    id
    date
  }
}
    `;

export function useAddExamMutation() {
  return Urql.useMutation<AddExamMutation, AddExamMutationVariables>(AddExamDocument);
};
export const LoginProfessorDocument = gql`
    mutation LoginProfessor($password: String!, $email: String!) {
  loginProfessor(password: $password, email: $email) {
    id
    firstName
    lastName
    email
    password
    jmbg
    role
  }
}
    `;

export function useLoginProfessorMutation() {
  return Urql.useMutation<LoginProfessorMutation, LoginProfessorMutationVariables>(LoginProfessorDocument);
};
export const DeregisterDocument = gql`
    mutation Deregister($examID: String!) {
  deregisterExam(examID: $examID)
}
    `;

export function useDeregisterMutation() {
  return Urql.useMutation<DeregisterMutation, DeregisterMutationVariables>(DeregisterDocument);
};
export const RegisterExamDocument = gql`
    mutation RegisterExam($examID: String!) {
  registerExam(examID: $examID)
}
    `;

export function useRegisterExamMutation() {
  return Urql.useMutation<RegisterExamMutation, RegisterExamMutationVariables>(RegisterExamDocument);
};
export const RegisterPassedExamDocument = gql`
    mutation RegisterPassedExam($id: String!, $points: Float!) {
  registerPassedExam(points: $points, id: $id)
}
    `;

export function useRegisterPassedExamMutation() {
  return Urql.useMutation<RegisterPassedExamMutation, RegisterPassedExamMutationVariables>(RegisterPassedExamDocument);
};
export const UpdateEmailDocument = gql`
    mutation updateEmail($email: String!) {
  updateEmail(email: $email)
}
    `;

export function useUpdateEmailMutation() {
  return Urql.useMutation<UpdateEmailMutation, UpdateEmailMutationVariables>(UpdateEmailDocument);
};
export const UpdatePasswordDocument = gql`
    mutation updatePassword($pass: String!) {
  updatePassword(pass: $pass)
}
    `;

export function useUpdatePasswordMutation() {
  return Urql.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument);
};
export const GetAllPostsDocument = gql`
    query getAllPosts {
  getAllPosts {
    id
    creationDate
    creatorID
    text
    creator {
      firstName
      lastName
    }
  }
}
    `;

export function useGetAllPostsQuery(options: Omit<Urql.UseQueryArgs<GetAllPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllPostsQuery>({ query: GetAllPostsDocument, ...options });
};
export const ImportantDocument = gql`
    query Important {
  getImportant {
    id
    creationDate
    creator {
      id
      firstName
      lastName
    }
    creatorID
    text
    important
  }
}
    `;

export function useImportantQuery(options: Omit<Urql.UseQueryArgs<ImportantQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ImportantQuery>({ query: ImportantDocument, ...options });
};
export const ExamRecordFromIdDocument = gql`
    query ExamRecordFromId($id: String!) {
  ExamRecordFromId(id: $id) {
    id
    student {
      firstName
      lastName
      brind
    }
    exam {
      subject {
        subjectName
      }
    }
  }
}
    `;

export function useExamRecordFromIdQuery(options: Omit<Urql.UseQueryArgs<ExamRecordFromIdQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExamRecordFromIdQuery>({ query: ExamRecordFromIdDocument, ...options });
};
export const ExamsFromCurrentExamPeriodDocument = gql`
    query ExamsFromCurrentExamPeriod {
  examsFromCurrentExamPeriod {
    date
    subject {
      id
      subjectName
      espp
      type
    }
    examRecord {
      student {
        firstName
        lastName
        brind
      }
    }
  }
}
    `;

export function useExamsFromCurrentExamPeriodQuery(options: Omit<Urql.UseQueryArgs<ExamsFromCurrentExamPeriodQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExamsFromCurrentExamPeriodQuery>({ query: ExamsFromCurrentExamPeriodDocument, ...options });
};
export const GetAllModulsDocument = gql`
    query GetAllModuls {
  getAllModuls {
    id
    moduleName
    moduleCode
  }
}
    `;

export function useGetAllModulsQuery(options: Omit<Urql.UseQueryArgs<GetAllModulsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllModulsQuery>({ query: GetAllModulsDocument, ...options });
};
export const GetAllProfessorsDocument = gql`
    query GetAllProfessors {
  getAllProfessors {
    id
    firstName
    lastName
  }
}
    `;

export function useGetAllProfessorsQuery(options: Omit<Urql.UseQueryArgs<GetAllProfessorsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetAllProfessorsQuery>({ query: GetAllProfessorsDocument, ...options });
};
export const CurrentExPeriodDocument = gql`
    query CurrentExPeriod {
  currentExPeriod {
    id
    name
    beginningDate
    endDate
    modulID
    active
    exams {
      subject {
        subjectName
      }
    }
  }
}
    `;

export function useCurrentExPeriodQuery(options: Omit<Urql.UseQueryArgs<CurrentExPeriodQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentExPeriodQuery>({ query: CurrentExPeriodDocument, ...options });
};
export const GetSubjectDocument = gql`
    query getSubject($id: String!) {
  getSubject(id: $id) {
    id
    subjectName
  }
}
    `;

export function useGetSubjectQuery(options: Omit<Urql.UseQueryArgs<GetSubjectQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetSubjectQuery>({ query: GetSubjectDocument, ...options });
};
export const MeProfessorDocument = gql`
    query MeProfessor {
  meProfessor {
    id
    firstName
    lastName
    email
    password
    jmbg
    role
  }
}
    `;

export function useMeProfessorQuery(options: Omit<Urql.UseQueryArgs<MeProfessorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeProfessorQuery>({ query: MeProfessorDocument, ...options });
};
export const ProfessorExamsDocument = gql`
    query ProfessorExams {
  professorExams {
    id
    date
    subject {
      id
      subjectName
      type
      espp
    }
  }
}
    `;

export function useProfessorExamsQuery(options: Omit<Urql.UseQueryArgs<ProfessorExamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfessorExamsQuery>({ query: ProfessorExamsDocument, ...options });
};
export const ProfessorSubjectsDocument = gql`
    query ProfessorSubjects {
  professorSubjects {
    id
    subjectName
    espp
    modul {
      moduleName
      moduleCode
    }
    modulID
    type
  }
}
    `;

export function useProfessorSubjectsQuery(options: Omit<Urql.UseQueryArgs<ProfessorSubjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ProfessorSubjectsQuery>({ query: ProfessorSubjectsDocument, ...options });
};
export const StudentsWhoSingedExamDocument = gql`
    query StudentsWhoSingedExam($subjectID: String!) {
  studentsWhoSingedExam(subjectID: $subjectID) {
    id
    exam {
      subject {
        subjectName
      }
    }
    student {
      id
      firstName
      lastName
      brind
    }
  }
}
    `;

export function useStudentsWhoSingedExamQuery(options: Omit<Urql.UseQueryArgs<StudentsWhoSingedExamQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StudentsWhoSingedExamQuery>({ query: StudentsWhoSingedExamDocument, ...options });
};
export const AverageGradeDocument = gql`
    query AverageGrade {
  averageGrade
}
    `;

export function useAverageGradeQuery(options: Omit<Urql.UseQueryArgs<AverageGradeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<AverageGradeQuery>({ query: AverageGradeDocument, ...options });
};
export const EspbDocument = gql`
    query ESPB {
  sumESPP
}
    `;

export function useEspbQuery(options: Omit<Urql.UseQueryArgs<EspbQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<EspbQuery>({ query: EspbDocument, ...options });
};
export const ExamsFromExaminationPeriodDocument = gql`
    query ExamsFromExaminationPeriod {
  examsFromExaminationPeriod {
    id
    name
    beginningDate
    endDate
    exams {
      id
      date
      examRecord {
        id
        studentID
        singed
      }
      subject {
        subjectName
        espp
        type
        professor {
          firstName
          lastName
        }
      }
    }
  }
}
    `;

export function useExamsFromExaminationPeriodQuery(options: Omit<Urql.UseQueryArgs<ExamsFromExaminationPeriodQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ExamsFromExaminationPeriodQuery>({ query: ExamsFromExaminationPeriodDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    firstName
    middleName
    lastName
    jmbg
    brind
    birthDate
    role
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PassedExamsDocument = gql`
    query PassedExams {
  passedExams {
    grade {
      value
    }
    points
    passed
    exam {
      date
      examinationPeriod {
        name
      }
      subject {
        subjectName
        espp
        type
        professor {
          firstName
          lastName
        }
      }
    }
  }
}
    `;

export function usePassedExamsQuery(options: Omit<Urql.UseQueryArgs<PassedExamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PassedExamsQuery>({ query: PassedExamsDocument, ...options });
};
export const RegisteredExamsDocument = gql`
    query RegisteredExams {
  registeredExams {
    id
    exam {
      id
      date
      subject {
        espp
        subjectName
        type
        professor {
          firstName
          lastName
        }
      }
    }
  }
}
    `;

export function useRegisteredExamsQuery(options: Omit<Urql.UseQueryArgs<RegisteredExamsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<RegisteredExamsQuery>({ query: RegisteredExamsDocument, ...options });
};
export const StudentsSubjectsDocument = gql`
    query StudentsSubjects {
  studentsSubjects {
    id
    subjectName
    espp
    type
  }
}
    `;

export function useStudentsSubjectsQuery(options: Omit<Urql.UseQueryArgs<StudentsSubjectsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StudentsSubjectsQuery>({ query: StudentsSubjectsDocument, ...options });
};