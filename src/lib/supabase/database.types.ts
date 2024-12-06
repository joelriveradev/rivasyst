export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      phases: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          project_id: string
          sequence: number
          started_at: string | null
          status: Database["public"]["Enums"]["phase_status"]
          type: Database["public"]["Enums"]["project_phase"]
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          project_id?: string
          sequence: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["phase_status"]
          type: Database["public"]["Enums"]["project_phase"]
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          project_id?: string
          sequence?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["phase_status"]
          type?: Database["public"]["Enums"]["project_phase"]
        }
        Relationships: [
          {
            foreignKeyName: "phases_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          additional_info: string
          budget: string
          company: string | null
          complete: boolean | null
          context_problem: string
          context_solution: string
          created_at: string
          design_branding: string
          design_preferences: string
          design_ux: string
          email: string
          full_name: string
          id: string
          phone_number: string
          reference_number: string
          status: Database["public"]["Enums"]["project_status"] | null
          timeline: string
        }
        Insert: {
          additional_info?: string
          budget: string
          company?: string | null
          complete?: boolean | null
          context_problem: string
          context_solution: string
          created_at?: string
          design_branding: string
          design_preferences: string
          design_ux: string
          email: string
          full_name: string
          id?: string
          phone_number: string
          reference_number: string
          status?: Database["public"]["Enums"]["project_status"] | null
          timeline: string
        }
        Update: {
          additional_info?: string
          budget?: string
          company?: string | null
          complete?: boolean | null
          context_problem?: string
          context_solution?: string
          created_at?: string
          design_branding?: string
          design_preferences?: string
          design_ux?: string
          email?: string
          full_name?: string
          id?: string
          phone_number?: string
          reference_number?: string
          status?: Database["public"]["Enums"]["project_status"] | null
          timeline?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          completed: boolean
          completed_at: string | null
          complexity: number
          created_at: string
          id: string
          owner: Database["public"]["Enums"]["TASK_OWNER"] | null
          phase_id: string | null
          title: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          complexity: number
          created_at?: string
          id?: string
          owner?: Database["public"]["Enums"]["TASK_OWNER"] | null
          phase_id?: string | null
          title: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          complexity?: number
          created_at?: string
          id?: string
          owner?: Database["public"]["Enums"]["TASK_OWNER"] | null
          phase_id?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_phase_id_fkey"
            columns: ["phase_id"]
            isOneToOne: false
            referencedRelation: "phases"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      phase_status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"
      project_phase: "DISCOVERY" | "PROPOSAL" | "DEVELOPMENT" | "LAUNCH"
      project_status:
        | "RECEIVED"
        | "PLANNING"
        | "IN_PROGRESS"
        | "REVIEW"
        | "TESTING"
        | "DEPLOYED"
        | "ON_HOLD"
        | "CANCELLED"
      TASK_OWNER: "ADMIN" | "USER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
