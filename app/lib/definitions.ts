export type Exercise = {
  id: string;
  nl_text: string;
  tl_text: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  body: string;
};

export type Collection = {
  id: string;
  name: string;
};