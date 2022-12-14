USE [RocketWorks]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 12/06/2022 14:56:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[Mobile] [varchar](10) NOT NULL,
	[IsPermanent] [bit] NOT NULL,
	[Gender] [varchar](10) NOT NULL,
	[DepartmentId] [int] NOT NULL,
	[DateOfBirth] [date] NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Employee] ON
INSERT [dbo].[Employee] ([EmployeeId], [FirstName], [LastName], [Email], [Mobile], [IsPermanent], [Gender], [DepartmentId], [DateOfBirth]) VALUES (11, N'Ronak', N'Patel', N'andra@mail.com', N'1234567891', 1, N'male', 3, CAST(0x251B0B00 AS Date))
INSERT [dbo].[Employee] ([EmployeeId], [FirstName], [LastName], [Email], [Mobile], [IsPermanent], [Gender], [DepartmentId], [DateOfBirth]) VALUES (12, N'Amit', N'Gohil', N'rakesh@mail.com', N'4561237891', 1, N'male', 3, CAST(0x251B0B00 AS Date))
INSERT [dbo].[Employee] ([EmployeeId], [FirstName], [LastName], [Email], [Mobile], [IsPermanent], [Gender], [DepartmentId], [DateOfBirth]) VALUES (13, N'Vandan', N'Patel', N'amit@mail.com', N'4561237890', 1, N'male', 1, CAST(0x251B0B00 AS Date))
INSERT [dbo].[Employee] ([EmployeeId], [FirstName], [LastName], [Email], [Mobile], [IsPermanent], [Gender], [DepartmentId], [DateOfBirth]) VALUES (14, N'Rajesh', N'Mehra', N'anna@mail.com', N'1234567891', 1, N'male', 3, CAST(0x251B0B00 AS Date))
SET IDENTITY_INSERT [dbo].[Employee] OFF
/****** Object:  Table [dbo].[Department]    Script Date: 12/06/2022 14:56:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Department](
	[DepartmentId] [int] IDENTITY(1,1) NOT NULL,
	[DepartmentName] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Department] PRIMARY KEY CLUSTERED 
(
	[DepartmentId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Department] ON
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName]) VALUES (1, N'HR')
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName]) VALUES (2, N'IT')
INSERT [dbo].[Department] ([DepartmentId], [DepartmentName]) VALUES (3, N'Accounts')
SET IDENTITY_INSERT [dbo].[Department] OFF
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/06/2022 14:56:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20221104033417_InitialSetup', N'3.1.0')
