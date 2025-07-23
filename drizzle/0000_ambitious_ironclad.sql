CREATE TABLE "Account" (
	"id" text PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"userId" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "Account_userId_unique" UNIQUE("userId")
);
--> statement-breakpoint
CREATE TABLE "Post" (
	"id" text PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"published" boolean DEFAULT false,
	"authorId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" text PRIMARY KEY DEFAULT 'cuid()' NOT NULL,
	"email" text,
	"name" text,
	"avatarUrl" text,
	"createdAt" timestamp with time zone DEFAULT now(),
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE UNIQUE INDEX "provider_providerAccountId" ON "Account" USING btree ("provider","providerAccountId");