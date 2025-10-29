"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard, Pencil, Settings } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            SVG Complex Editor
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Advanced SVG Editor for Creating Complex Diagrams with Walls, Zones,
            Text, Icons and Background Images
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <LayoutDashboard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Dashboard</CardTitle>
              </div>
              <CardDescription>
                Overview of your projects and recent work
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Manage your SVG projects and access tools</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Pencil className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Editor</CardTitle>
              </div>
              <CardDescription>
                Create and edit complex diagrams
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Powerful SVG editing tools with multiple primitives</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Settings</CardTitle>
              </div>
              <CardDescription>
                Customize your editor preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Configure tools, themes, and more</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <Button asChild size="lg">
            <Link href="/editor">Open Editor</Link>
          </Button>
          <Button variant="outline" size="lg">
            <Link href="/projects">My Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}