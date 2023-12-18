export type Concept = {
  id: number;
  text: string;
  explanation: string;
};

export type Vocab = {
  id: number;
  en_text: string;
  kr_text: string;
};

export type Exercise = {
  id: number;
  en_text: string;
  kr_text: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Lesson = {
  id?: number;
  title: string;
  summary: string;
  body: string;
};