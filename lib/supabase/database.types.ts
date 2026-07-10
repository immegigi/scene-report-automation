export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      admin_profiles: {
        Row: {
          user_id: string;
          email: string;
          display_name: string | null;
          created_at: string | null;
        };
        Insert: {
          user_id: string;
          email: string;
          display_name?: string | null;
          created_at?: string | null;
        };
        Update: {
          user_id?: string;
          email?: string;
          display_name?: string | null;
          created_at?: string | null;
        };
      };
      customers: {
        Row: {
          id: string;
          name: string;
          email: string;
          source_channel: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          source_channel?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          source_channel?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      submissions: {
        Row: {
          id: string;
          customer_id: string | null;
          relationship_type: string | null;
          scene_text: string;
          actual_words: string | null;
          interpretation: string | null;
          emotion: string | null;
          reaction: string | null;
          unsaid_words: string | null;
          desired_change: string | null;
          status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          relationship_type?: string | null;
          scene_text: string;
          actual_words?: string | null;
          interpretation?: string | null;
          emotion?: string | null;
          reaction?: string | null;
          unsaid_words?: string | null;
          desired_change?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          customer_id?: string | null;
          relationship_type?: string | null;
          scene_text?: string;
          actual_words?: string | null;
          interpretation?: string | null;
          emotion?: string | null;
          reaction?: string | null;
          unsaid_words?: string | null;
          desired_change?: string | null;
          status?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
      };
      analyses: {
        Row: {
          id: string;
          submission_id: string | null;
          risk_level: string | null;
          risk_reason: string | null;
          allow_report_generation: boolean | null;
          scene_code: string | null;
          cognitive_code: string | null;
          behavior_code: string | null;
          pattern_code: string | null;
          pattern_name: string | null;
          scene_summary: string | null;
          facts: Json | null;
          interpretations: Json | null;
          emotion_flow: Json | null;
          hidden_need: string | null;
          object_relation_note: string | null;
          community_hook: string | null;
          recommended_archive_prompt: string | null;
          growth_direction: string | null;
          quality_score: number | null;
          raw_ai_outputs: Json | null;
          parse_error: string | null;
          model_name: string | null;
          prompt_version: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
      reports: {
        Row: {
          id: string;
          submission_id: string | null;
          email_subject: string | null;
          email_body: string | null;
          pdf_page_1: string | null;
          pdf_page_2: string | null;
          pdf_page_3: string | null;
          pdf_page_4: string | null;
          pdf_page_5: string | null;
          pdf_url: string | null;
          review_status: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
      };
    };
  };
};
