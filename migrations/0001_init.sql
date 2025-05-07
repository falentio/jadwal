-- Migration number: 0001 	 2025-04-26T06:47:40.529Z
--- Dialect SQLITE
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    auth_id TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT current_timestamp
);

CREATE TABLE IF NOT EXISTS organizations (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    website_name TEXT UNIQUE NOT NULL, 
    description TEXT,
    creator_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,

    FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_organizations_website_name ON organizations(website_name);

CREATE TABLE IF NOT EXISTS organization_members (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    organization_id TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE INDEX IF NOT EXISTS idx_organization_members_user_id_and_organization_id ON organization_members(organization_id, user_id);

CREATE TABLE IF NOT EXISTS schedules (
    id TEXT PRIMARY KEY,
    organization_id TEXT NOT NULL,
    subject TEXT NOT NULL,
    description TEXT,
    start TEXT NOT NULL,
    end TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp,
    teacher_name TEXT,
    day INTEGER,
    FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

CREATE INDEX IF NOT EXISTS idx_schedules_organization_id ON schedules(organization_id);