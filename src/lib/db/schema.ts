// Database schema for Supabase

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  technologies: string[];
  featured: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  name: string;
  professional_name: string;
  bio: string;
  email: string;
  phone: string;
  avatar_url: string;
  titles: string[];
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  role: "admin" | "viewer";
  created_at: string;
}

// SQL Schema to create in Supabase:
/*
-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(500),
  link VARCHAR(500),
  technologies TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Profile Table
CREATE TABLE profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  professional_name VARCHAR(255),
  bio TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  titles TEXT[] DEFAULT '{}',
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Users Table (for admin authentication)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "projects_public_read" ON projects FOR SELECT USING (true);
CREATE POLICY "projects_admin_write" ON projects FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "projects_admin_update" ON projects FOR UPDATE WITH CHECK (auth.role() = 'admin');
CREATE POLICY "projects_admin_delete" ON projects FOR DELETE USING (auth.role() = 'admin');

CREATE POLICY "profile_public_read" ON profile FOR SELECT USING (true);
CREATE POLICY "profile_admin_write" ON profile FOR INSERT WITH CHECK (auth.role() = 'admin');
CREATE POLICY "profile_admin_update" ON profile FOR UPDATE WITH CHECK (auth.role() = 'admin');
*/
