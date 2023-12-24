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
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      exercises: {
        Row: {
          id: string
          side_a: string
          side_b: string
        }
        Insert: {
          id?: string
          side_a: string
          side_b: string
        }
        Update: {
          id?: string
          side_a?: string
          side_b?: string
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
          id: string
          summary: string
          title: string
        }
        Insert: {
          body: string
          id?: string
          summary: string
          title: string
        }
        Update: {
          body?: string
          id?: string
          summary?: string
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
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
          id: string | null
          name: string | null
          uid: string | null
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
      lesson_with_owner_view: {
        Row: {
          body: string | null
          id: string | null
          lid: string | null
          summary: string | null
          title: string | null
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
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
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
