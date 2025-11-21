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
      participants: {
        Row: {
          id: string
          name: string
          name_zh: string | null
          gender: 'M' | 'F' | null
          english_first_name: string | null
          english_last_name: string | null
          phone: string
          email: string | null
          image_url: string | null
          team_id: string | null
          team_category: string | null
          role: 'leader' | 'member' | 'volunteer'
          nationality: string
          position: string | null
          notes: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_zh?: string | null
          gender?: 'M' | 'F' | null
          english_first_name?: string | null
          english_last_name?: string | null
          phone: string
          email?: string | null
          image_url?: string | null
          team_id?: string | null
          team_category?: string | null
          role: 'leader' | 'member' | 'volunteer'
          nationality: string
          position?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_zh?: string | null
          gender?: 'M' | 'F' | null
          english_first_name?: string | null
          english_last_name?: string | null
          phone?: string
          email?: string | null
          image_url?: string | null
          team_id?: string | null
          team_category?: string | null
          role?: 'leader' | 'member' | 'volunteer'
          nationality?: string
          position?: string | null
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      schedules: {
        Row: {
          id: string
          title: string
          title_zh: string
          description: string | null
          description_zh: string | null
          image_url: string | null
          event_type: 'press' | 'rally' | 'concert' | 'outreach' | 'meeting' | 'other'
          location: string
          location_zh: string
          address: string | null
          start_time: string
          end_time: string
          performers: string[] | null
          is_main_event: boolean
          color: string | null
          max_participants: number | null
          current_participants: number | null
          tags: string[] | null
          is_public: boolean
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_zh: string
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          event_type: 'press' | 'rally' | 'concert' | 'outreach' | 'meeting' | 'other'
          location: string
          location_zh: string
          address?: string | null
          start_time: string
          end_time: string
          performers?: string[] | null
          is_main_event?: boolean
          color?: string | null
          max_participants?: number | null
          current_participants?: number | null
          tags?: string[] | null
          is_public: boolean
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_zh?: string
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          event_type?: 'press' | 'rally' | 'concert' | 'outreach' | 'meeting' | 'other'
          location?: string
          location_zh?: string
          address?: string | null
          start_time?: string
          end_time?: string
          performers?: string[] | null
          is_main_event?: boolean
          color?: string | null
          max_participants?: number | null
          current_participants?: number | null
          tags?: string[] | null
          is_public?: boolean
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          title_zh: string
          description: string | null
          description_zh: string | null
          image_url: string | null
          category: 'preparation' | 'event' | 'followup' | 'logistics' | 'program'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          assigned_to: string[] | null
          team_id: string | null
          due_date: string | null
          start_date: string | null
          is_public: boolean
          tags: string[] | null
          created_by: string
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_zh: string
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          category: 'preparation' | 'event' | 'followup' | 'logistics' | 'program'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          assigned_to?: string[] | null
          team_id?: string | null
          due_date?: string | null
          start_date?: string | null
          is_public: boolean
          tags?: string[] | null
          created_by: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_zh?: string
          description?: string | null
          description_zh?: string | null
          image_url?: string | null
          category?: 'preparation' | 'event' | 'followup' | 'logistics' | 'program'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          status?: 'todo' | 'in_progress' | 'completed' | 'cancelled'
          assigned_to?: string[] | null
          team_id?: string | null
          due_date?: string | null
          start_date?: string | null
          is_public?: boolean
          tags?: string[] | null
          created_by?: string
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      teams: {
        Row: {
          id: string
          name: string
          name_zh: string
          description: string | null
          leader_id: string | null
          member_count: number
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          name_zh: string
          description?: string | null
          leader_id?: string | null
          member_count?: number
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          name_zh?: string
          description?: string | null
          leader_id?: string | null
          member_count?: number
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      worship_songs: {
        Row: {
          id: string
          title: string
          title_zh: string | null
          artist: string | null
          type: 'hymn' | 'praise' | 'ccm' | 'worship'
          lyrics: string | null
          image_url: string | null
          pdf_url: string | null
          youtube_url: string | null
          sheet_music_url: string | null
          tags: string[] | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          title_zh?: string | null
          artist?: string | null
          type: 'hymn' | 'praise' | 'ccm' | 'worship'
          lyrics?: string | null
          image_url?: string | null
          pdf_url?: string | null
          youtube_url?: string | null
          sheet_music_url?: string | null
          tags?: string[] | null
          is_public: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          title_zh?: string | null
          artist?: string | null
          type?: 'hymn' | 'praise' | 'ccm' | 'worship'
          lyrics?: string | null
          image_url?: string | null
          pdf_url?: string | null
          youtube_url?: string | null
          sheet_music_url?: string | null
          tags?: string[] | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          password: string
          name: string
          role: 'super_admin' | 'admin' | 'moderator'
          permissions: string[]
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password: string
          name: string
          role: 'super_admin' | 'admin' | 'moderator'
          permissions?: string[]
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password?: string
          name?: string
          role?: 'super_admin' | 'admin' | 'moderator'
          permissions?: string[]
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

