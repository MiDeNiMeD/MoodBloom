import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMood } from '../contexts/MoodContext';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { subDays, format, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type TimeRange = '7d' | '14d' | '30d' | 'all';

const Analytics: React.FC = () => {
  const { moodEntries } = useMood();
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  const getFilteredEntries = () => {
    if (timeRange === 'all') {
      return moodEntries;
    }
    
    const days = timeRange === '7d' ? 7 : timeRange === '14d' ? 14 : 30;
    const cutoffDate = subDays(new Date(), days);
    
    return moodEntries.filter(
      entry => new Date(entry.date) >= cutoffDate
    );
  };

  const filteredEntries = getFilteredEntries();
  
  const getMoodAverage = () => {
    if (filteredEntries.length === 0) return 0;
    
    const sum = filteredEntries.reduce((acc, entry) => acc + entry.value, 0);
    return (sum / filteredEntries.length).toFixed(1);
  };
  
  const getMoodDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // For mood values 1-5
    
    filteredEntries.forEach(entry => {
      distribution[entry.value - 1]++;
    });
    
    return distribution;
  };

  const getLineChartData = () => {
    let days: Date[];
    
    if (timeRange === '7d') {
      days = Array.from({ length: 7 }, (_, i) => subDays(new Date(), 6 - i));
    } else if (timeRange === '14d') {
      days = Array.from({ length: 14 }, (_, i) => subDays(new Date(), 13 - i));
    } else if (timeRange === '30d') {
      days = Array.from({ length: 30 }, (_, i) => subDays(new Date(), 29 - i));
    } else {
      // If 'all', get all dates from first entry to today
      if (moodEntries.length === 0) {
        days = [new Date()];
      } else {
        const sortedDates = [...moodEntries]
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        
        const firstDate = new Date(sortedDates[0].date);
        days = eachDayOfInterval({ start: firstDate, end: new Date() });
      }
    }
    
    const data = days.map(day => {
      const formattedDay = format(day, 'yyyy-MM-dd');
      const entry = moodEntries.find(e => 
        format(parseISO(e.date), 'yyyy-MM-dd') === formattedDay
      );
      
      return entry ? entry.value : null;
    });
    
    return {
      labels: days.map(day => format(day, 'MMM d')),
      datasets: [
        {
          label: 'Mood',
          data,
          fill: false,
          borderColor: 'rgb(72, 187, 120)',
          tension: 0.1,
          pointBackgroundColor: 'rgb(72, 187, 120)',
          pointRadius: 4,
        },
      ],
    };
  };
  
  const getBarChartData = () => {
    const distribution = getMoodDistribution();
    
    return {
      labels: ['Sad', 'Meh', 'Neutral', 'Good', 'Happy'],
      datasets: [
        {
          label: 'Mood Distribution',
          data: distribution,
          backgroundColor: [
            'rgba(66, 153, 225, 0.6)', // Blue
            'rgba(144, 205, 244, 0.6)', // Light Blue
            'rgba(246, 224, 94, 0.6)',  // Yellow
            'rgba(168, 224, 185, 0.6)', // Light Green
            'rgba(72, 187, 120, 0.6)',  // Green
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const lineChartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        title: {
          display: true,
          text: 'Mood Level',
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const value = context.parsed.y;
            let label = '';
            
            if (value === 1) label = 'Sad';
            else if (value === 2) label = 'Meh';
            else if (value === 3) label = 'Neutral';
            else if (value === 4) label = 'Good';
            else if (value === 5) label = 'Happy';
            
            return `Mood: ${label} (${value})`;
          },
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Entries',
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4 text-neutral-800">
        Mood Analytics
      </h1>
      
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          <button
            className={`btn-sm ${
              timeRange === '7d' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setTimeRange('7d')}
          >
            7 Days
          </button>
          <button
            className={`btn-sm ${
              timeRange === '14d' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setTimeRange('14d')}
          >
            14 Days
          </button>
          <button
            className={`btn-sm ${
              timeRange === '30d' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setTimeRange('30d')}
          >
            30 Days
          </button>
          <button
            className={`btn-sm ${
              timeRange === 'all' ? 'btn-primary' : 'btn-outline'
            }`}
            onClick={() => setTimeRange('all')}
          >
            All Time
          </button>
        </div>
      </div>
      
      {filteredEntries.length === 0 ? (
        <div className="card bg-neutral-50 text-center py-12">
          <p className="text-neutral-600">No mood data available for this time period.</p>
          <p className="text-neutral-500 text-sm mt-2">Start logging your mood to see analytics.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="card">
              <h2 className="text-lg font-medium mb-1 text-neutral-700">Average Mood</h2>
              <div className="text-4xl font-semibold text-primary-500">{getMoodAverage()}</div>
              <p className="text-sm text-neutral-500">out of 5</p>
            </div>
            
            <div className="card">
              <h2 className="text-lg font-medium mb-1 text-neutral-700">Total Entries</h2>
              <div className="text-4xl font-semibold text-secondary-500">{filteredEntries.length}</div>
              <p className="text-sm text-neutral-500">
                {timeRange === 'all' ? 'all time' : `last ${
                  timeRange === '7d' ? '7' : timeRange === '14d' ? '14' : '30'
                } days`}
              </p>
            </div>
          </div>
          
          <div className="card mb-6">
            <h2 className="text-lg font-medium mb-4 text-neutral-700">Mood Over Time</h2>
            <Line data={getLineChartData()} options={lineChartOptions} />
          </div>
          
          <div className="card">
            <h2 className="text-lg font-medium mb-4 text-neutral-700">Mood Distribution</h2>
            <Bar data={getBarChartData()} options={barChartOptions} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Analytics;