export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      collection_lessons: {
        Row: {
          cid: string
          lid: string
        }
        Insert: {
          cid: string
          lid: string
        }
        Update: {
          cid?: string
          lid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collection_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lesson_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
      collections: {
        Row: {
          created_at: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          created_at: string | null
          id: string
          side_a: string
          side_b: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          side_a: string
          side_b: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          side_a?: string
          side_b?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exerciseset_exercises: {
        Row: {
          eid: string
          esid: string
        }
        Insert: {
          eid: string
          esid: string
        }
        Update: {
          eid?: string
          esid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercise_with_lessons"
            referencedColumns: ["eid"]
          },
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_exerciseset"
            columns: ["esid"]
            isOneToOne: false
            referencedRelation: "exercisesets"
            referencedColumns: ["id"]
          }
        ]
      }
      exercisesets: {
        Row: {
          created_at: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      lesson_exercises: {
        Row: {
          eid: string
          lid: string
        }
        Insert: {
          eid: string
          lid: string
        }
        Update: {
          eid?: string
          lid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercise_with_lessons"
            referencedColumns: ["eid"]
          },
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lesson_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          }
        ]
      }
      lessons: {
        Row: {
          body: string
          created_at: string | null
          id: string
          summary: string
          title: string
          updated_at: string | null
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          summary: string
          title: string
          updated_at?: string | null
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          summary?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_collections: {
        Row: {
          cid: string
          uid: string
        }
        Insert: {
          cid: string
          uid: string
        }
        Update: {
          cid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collection_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_exercises: {
        Row: {
          eid: string
          uid: string
        }
        Insert: {
          eid: string
          uid: string
        }
        Update: {
          eid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercise_with_lessons"
            referencedColumns: ["eid"]
          },
          {
            foreignKeyName: "fk_exercise"
            columns: ["eid"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_exercisesets: {
        Row: {
          esid: string
          uid: string
        }
        Insert: {
          esid: string
          uid: string
        }
        Update: {
          esid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_exerciseset"
            columns: ["esid"]
            isOneToOne: false
            referencedRelation: "exercisesets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_lessons: {
        Row: {
          lid: string
          uid: string
        }
        Insert: {
          lid: string
          uid: string
        }
        Update: {
          lid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lesson_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      collection_with_owner_view: {
        Row: {
          cid: string | null
          created_at: string | null
          id: string | null
          name: string | null
          uid: string | null
          updated_at: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_collection"
            columns: ["cid"]
            isOneToOne: false
            referencedRelation: "collection_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      exercise_with_lessons: {
        Row: {
          eid: string | null
          lesson_summary: string | null
          lesson_title: string | null
          lid: string | null
          side_a: string | null
          side_b: string | null
          uid: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lesson_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      lesson_with_owner_view: {
        Row: {
          body: string | null
          created_at: string | null
          id: string | null
          lid: string | null
          summary: string | null
          title: string | null
          uid: string | null
          updated_at: string | null
          username: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_lesson"
            columns: ["lid"]
            isOneToOne: false
            referencedRelation: "lesson_with_owner_view"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["uid"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Functions: {
      create_collection:
        | {
            Args: {
              name: string
            }
            Returns: string
          }
        | {
            Args: {
              name: string
              user_id: string
            }
            Returns: string
          }
      create_exercise: {
        Args: {
          side_a: string
          side_b: string
        }
        Returns: string
      }
      create_lesson: {
        Args: {
          title: string
          summary: string
          body: string
        }
        Returns: string
      }
      fetch_collections_for_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          name: string
          lesson_count: number
          author: string
        }[]
      }
      fetch_exercises_for_collection: {
        Args: {
          collection_id: string
        }
        Returns: {
          eid: string
          side_b: string
          side_a: string
          lid: string
          lesson_title: string
          lesson_summary: string
        }[]
      }
      fetch_exercises_for_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          side_a: string
          side_b: string
          lesson_count: string
        }[]
      }
      fetch_lessons_for_collection: {
        Args: {
          cid: string
        }
        Returns: {
          id: string
          title: string
          summary: string
          exercise_count: number
        }[]
      }
      fetch_lessons_for_user: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: string
          title: string
          summary: string
          exercise_count: string
          author: string
        }[]
      }
      fetch_user_collections_with_lesson:
        | {
            Args: {
              lesson_id: string
            }
            Returns: {
              cid: string
              name: string
              lid: string
            }[]
          }
        | {
            Args: {
              lesson_id: string
              user_id: string
            }
            Returns: {
              cid: string
              name: string
              lid: string
            }[]
          }
      insert_user_exerciseset_and_exercises: {
        Args: {
          p_exerciseset_title: string
          p_exercises: Database["public"]["CompositeTypes"]["exercise_type"][]
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      exercise_type: {
        id: string
        side_a: string
        side_b: string
        lesson_ids: unknown
      }
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
