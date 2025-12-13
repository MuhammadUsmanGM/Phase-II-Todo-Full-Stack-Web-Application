'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/types/task';
import TaskStatistics from './TaskStatistics';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  PieChart
} from 'lucide-react';

interface StatisticsDashboardProps {
  tasks: Task[];
}

export default function StatisticsDashboard({ tasks }: StatisticsDashboardProps) {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    overdueTasks: 0,
    completionRate: 0,
    avgCompletionTime: 0,
    tasksThisWeek: 0,
    tasksThisMonth: 0,
  });

  useEffect(() => {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(today.getMonth() - 1);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Calculate overdue tasks
    const overdueTasks = tasks.filter(task => 
      task.due_date && 
      !task.completed && 
      new Date(task.due_date) < today
    ).length;

    // Calculate tasks created in the last week/month
    const tasksThisWeek = tasks.filter(task => 
      new Date(task.created_at) >= oneWeekAgo
    ).length;

    const tasksThisMonth = tasks.filter(task => 
      new Date(task.created_at) >= oneMonthAgo
    ).length;

    // Calculate average completion time
    let totalCompletionDays = 0;
    let completedCount = 0;
    tasks.forEach(task => {
      if (task.completed && task.updated_at) {
        const creationDate = new Date(task.created_at);
        const completionDate = new Date(task.updated_at);
        const diffMs = completionDate.getTime() - creationDate.getTime();
        const diffDays = diffMs / (1000 * 60 * 60 * 24);
        totalCompletionDays += diffDays;
        completedCount++;
      }
    });
    const avgCompletionTime = completedCount > 0 ? totalCompletionDays / completedCount : 0;

    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks,
      completionRate,
      avgCompletionTime,
      tasksThisWeek,
      tasksThisMonth,
    });
  }, [tasks]);

  // Prepare data for productivity trend visualization
  const productivityTrend = [
    { day: 'Mon', completed: 2, total: 5 },
    { day: 'Tue', completed: 4, total: 5 },
    { day: 'Wed', completed: 1, total: 3 },
    { day: 'Thu', completed: 5, total: 6 },
    { day: 'Fri', completed: 3, total: 4 },
    { day: 'Sat', completed: 2, total: 2 },
    { day: 'Sun', completed: 1, total: 2 },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200/50 dark:from-indigo-900/30 dark:to-indigo-800/30 dark:border-indigo-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-indigo-800 dark:text-indigo-200">Total Tasks</CardTitle>
            <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-900 dark:text-white">{stats.totalTasks}</div>
            <p className="text-xs text-indigo-600 dark:text-indigo-300">All tasks created</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50 dark:from-green-900/30 dark:to-green-800/30 dark:border-green-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-green-800 dark:text-green-200">Completed</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-white">{stats.completedTasks}</div>
            <p className="text-xs text-green-600 dark:text-green-300">Tasks finished</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200/50 dark:from-amber-900/30 dark:to-amber-800/30 dark:border-amber-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-amber-800 dark:text-amber-200">Pending</CardTitle>
            <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900 dark:text-white">{stats.pendingTasks}</div>
            <p className="text-xs text-amber-600 dark:text-amber-300">Tasks to complete</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200/50 dark:from-red-900/30 dark:to-red-800/30 dark:border-red-700/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-red-800 dark:text-red-200">Overdue</CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900 dark:text-white">{stats.overdueTasks}</div>
            <p className="text-xs text-red-600 dark:text-red-300">Tasks past due</p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800 dark:text-white">
              <TrendingUp className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Completion Rate</span>
                <Badge variant="outline" className="text-lg font-bold">
                  {stats.completionRate}%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Avg. Completion Time</span>
                <Badge variant="outline" className="text-lg font-bold">
                  {Math.round(stats.avgCompletionTime)} days
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tasks This Week</span>
                <Badge variant="outline" className="text-lg font-bold">
                  {stats.tasksThisWeek}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Tasks This Month</span>
                <Badge variant="outline" className="text-lg font-bold">
                  {stats.tasksThisMonth}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Productivity Trend */}
        <Card className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-gray-200 dark:border-gray-600">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-800 dark:text-white">
              <Calendar className="mr-2 h-5 w-5 text-purple-600 dark:text-purple-400" />
              Weekly Productivity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {productivityTrend.map((day, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-10 text-sm text-gray-600 dark:text-gray-300">{day.day}</span>
                  <div className="flex-1 ml-2">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" 
                          style={{ width: `${(day.completed / day.total) * 100}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
                        {day.completed}/{day.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main chart visualization */}
      <TaskStatistics tasks={tasks} />
    </div>
  );
}