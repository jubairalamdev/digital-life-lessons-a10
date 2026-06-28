import { serverFetch, serverFetchById } from '@/lib/actions/common';
import React from 'react';
import { Table } from "@heroui/react";

const HomeContributors = async () => {
  let displayContributors = [];

  try {
    // 1. Fetch your aggregated raw contributor stats
    const contributionsData = await serverFetch(`${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:5000'}/api/lessons/top_contributors`, ["lessons"]);

    if (Array.isArray(contributionsData)) {
      // 2. Resolve internal profile fetches concurrently with Promise.all
      displayContributors = await Promise.all(
        contributionsData.map(async (contributor) => {
          try {
            // Adjust local fields to map your aggregation response (using _id or user_id)
            const targetId = contributor.user_id || contributor._id;
            const userProfile = await serverFetchById(
              `/api/users`, 
              targetId, ["users"]
            );

            return {
              id: targetId,
              name: userProfile?.name || "Anonymous User",
              email: userProfile?.email || "N/A",
              role: userProfile?.role || "user",
              totalLessons: contributor.totalLessons || 0
            };
          } catch (err) {
            console.error("Error matching contributor profile:", err);
            return {
              id: contributor.user_id,
              name: "Unresolved Profile",
              email: "N/A",
              role: "user",
              totalLessons: contributor.totalLessons || 0
            };
          }
        })
      );
    }
  } catch (error) {
    console.error("Failed to load contributors:", error);
  }

  return (
    <section className="w-full py-16 bg-zinc-950 border-zinc-900 relative">
      <div className="container mx-auto max-w-7xl px-4">
        
        {/* Section Heading matching your design theme layout */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Top Contributors <span className="text-green-400">since now</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-2 font-light">
            Recognizing the individuals actively preserving values and sharing community wisdom.
          </p>
        </div>

        {/* HeroUI Grid Table Wrapper */}
        <div className="bg-zinc-900/40 backdrop-blur-md border border-zinc-800 rounded-2xl overflow-hidden  shadow-xl">
          <Table aria-label="Top Contributors Table"  className="text-zinc-300">
            <Table.ScrollContainer>
              <Table.Content className="min-w-[600px]">
                <Table.Header>
                  <Table.Column isRowHeader className="bg-zinc-900 text-zinc-400 font-bold">Name</Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-bold">Email</Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-bold">System Role</Table.Column>
                  <Table.Column className="bg-zinc-900 text-zinc-400 font-bold text-right">Lessons Created</Table.Column>
                </Table.Header>
                <Table.Body>
                  {displayContributors.length > 0 ? (
                    displayContributors.map((user) => (
                      <Table.Row key={user.id} className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                        <Table.Cell className="font-semibold text-white py-4">{user.name}</Table.Cell>
                        <Table.Cell className="text-zinc-400">{user.email}</Table.Cell>
                        <Table.Cell className="capitalize">
                          <span className={`px-2 py-0.5 rounded text-xs ${user?.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-zinc-800 text-zinc-400'}`}>
                            {user?.role}
                          </span>
                        </Table.Cell>
                        <Table.Cell className="text-right font-bold text-green-400">{user.totalLessons}</Table.Cell>
                      </Table.Row>
                    ))
                  ) : (
                    <Table.Row>
                      <Table.Cell className="text-center text-zinc-500 py-6" colSpan={4}>
                        No active reflections logged this week.
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>

      </div>
    </section>
  );
};

export default HomeContributors; 