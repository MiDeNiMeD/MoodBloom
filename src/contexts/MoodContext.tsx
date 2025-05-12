import React, { createContext, useContext, useState, useEffect } from "react";
import { MoodEntry, MoodValue, PlantType, Achievement } from "../types";
import { differenceInDays, isToday, subDays } from "date-fns";
import { sampleMoodEntries } from "../sampleData";

interface MoodContextProps {
  moodEntries: MoodEntry[];
  addMoodEntry: (entry: Omit<MoodEntry, "id">) => void;
  deleteMoodEntry: (id: string) => void;
  todaysMood: MoodEntry | null;
  plantType: PlantType;
  setPlantType: (type: PlantType) => void;
  plantGrowthLevel: number;
  currentStreak: number;
  longestStreak: number;
  achievements: Achievement[];
}

const MoodContext = createContext<MoodContextProps | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([
    {
      date: "2025-05-12T00:00:00Z",
      value: 5,
      id: "1747087325901",
    },
    {
      date: "2025-05-11T00:00:00Z",
      value: 5,
      id: "1747087325902",
    },
    {
      date: "2025-05-10T00:00:00Z",
      value: 4,
      id: "1747087325903",
    },
    {
      date: "2025-05-09T00:00:00Z",
      value: 1,
      id: "1747087325904",
    },
    {
      date: "2025-05-08T00:00:00Z",
      value: 3,
      id: "1747087325905",
    },
    {
      date: "2025-05-07T00:00:00Z",
      value: 4,
      id: "1747087325906",
    },
    {
      date: "2025-05-06T00:00:00Z",
      value: 1,
      id: "1747087325907",
    },
    {
      date: "2025-05-05T00:00:00Z",
      value: 3,
      id: "1747087325908",
    },
    {
      date: "2025-05-04T00:00:00Z",
      value: 5,
      id: "1747087325909",
    },
    {
      date: "2025-05-03T00:00:00Z",
      value: 5,
      id: "1747087325910",
    },
    {
      date: "2025-05-02T00:00:00Z",
      value: 5,
      id: "1747087325911",
    },
    {
      date: "2025-05-01T00:00:00Z",
      value: 2,
      id: "1747087325912",
    },
    {
      date: "2025-04-30T00:00:00Z",
      value: 4,
      id: "1747087325913",
    },
    {
      date: "2025-04-29T00:00:00Z",
      value: 4,
      id: "1747087325914",
    },
    {
      date: "2025-04-28T00:00:00Z",
      value: 1,
      id: "1747087325915",
    },
    {
      date: "2025-04-27T00:00:00Z",
      value: 1,
      id: "1747087325916",
    },
    {
      date: "2025-04-26T00:00:00Z",
      value: 2,
      id: "1747087325917",
    },
    {
      date: "2025-04-25T00:00:00Z",
      value: 1,
      id: "1747087325918",
    },
    {
      date: "2025-04-24T00:00:00Z",
      value: 3,
      id: "1747087325919",
    },
    {
      date: "2025-04-23T00:00:00Z",
      value: 1,
      id: "1747087325920",
    },
    {
      date: "2025-04-22T00:00:00Z",
      value: 1,
      id: "1747087325921",
    },
    {
      date: "2025-04-21T00:00:00Z",
      value: 5,
      id: "1747087325922",
    },
    {
      date: "2025-04-20T00:00:00Z",
      value: 5,
      id: "1747087325923",
    },
    {
      date: "2025-04-19T00:00:00Z",
      value: 5,
      id: "1747087325924",
    },
    {
      date: "2025-04-18T00:00:00Z",
      value: 2,
      id: "1747087325925",
    },
    {
      date: "2025-04-17T00:00:00Z",
      value: 1,
      id: "1747087325926",
    },
    {
      date: "2025-04-16T00:00:00Z",
      value: 2,
      id: "1747087325927",
    },
    {
      date: "2025-04-15T00:00:00Z",
      value: 5,
      id: "1747087325928",
    },
    {
      date: "2025-04-14T00:00:00Z",
      value: 5,
      id: "1747087325929",
    },
    {
      date: "2025-04-13T00:00:00Z",
      value: 4,
      id: "1747087325930",
    },
    {
      date: "2025-04-12T00:00:00Z",
      value: 1,
      id: "1747087325931",
    },
    {
      date: "2025-04-11T00:00:00Z",
      value: 4,
      id: "1747087325932",
    },
    {
      date: "2025-04-10T00:00:00Z",
      value: 5,
      id: "1747087325933",
    },
    {
      date: "2025-04-09T00:00:00Z",
      value: 2,
      id: "1747087325934",
    },
    {
      date: "2025-04-08T00:00:00Z",
      value: 3,
      id: "1747087325935",
    },
    {
      date: "2025-04-07T00:00:00Z",
      value: 4,
      id: "1747087325936",
    },
    {
      date: "2025-04-06T00:00:00Z",
      value: 5,
      id: "1747087325937",
    },
    {
      date: "2025-04-05T00:00:00Z",
      value: 1,
      id: "1747087325938",
    },
    {
      date: "2025-04-04T00:00:00Z",
      value: 4,
      id: "1747087325939",
    },
    {
      date: "2025-04-03T00:00:00Z",
      value: 2,
      id: "1747087325940",
    },
    {
      date: "2025-04-02T00:00:00Z",
      value: 2,
      id: "1747087325941",
    },
    {
      date: "2025-04-01T00:00:00Z",
      value: 3,
      id: "1747087325942",
    },
    {
      date: "2025-03-31T00:00:00Z",
      value: 3,
      id: "1747087325943",
    },
    {
      date: "2025-03-30T00:00:00Z",
      value: 4,
      id: "1747087325944",
    },
    {
      date: "2025-03-29T00:00:00Z",
      value: 3,
      id: "1747087325945",
    },
    {
      date: "2025-03-28T00:00:00Z",
      value: 4,
      id: "1747087325946",
    },
    {
      date: "2025-03-27T00:00:00Z",
      value: 2,
      id: "1747087325947",
    },
    {
      date: "2025-03-26T00:00:00Z",
      value: 5,
      id: "1747087325948",
    },
    {
      date: "2025-03-25T00:00:00Z",
      value: 3,
      id: "1747087325949",
    },
    {
      date: "2025-03-24T00:00:00Z",
      value: 3,
      id: "1747087325950",
    },
    {
      date: "2025-03-23T00:00:00Z",
      value: 4,
      id: "1747087325951",
    },
    {
      date: "2025-03-22T00:00:00Z",
      value: 3,
      id: "1747087325952",
    },
    {
      date: "2025-03-21T00:00:00Z",
      value: 2,
      id: "1747087325953",
    },
    {
      date: "2025-03-20T00:00:00Z",
      value: 3,
      id: "1747087325954",
    },
    {
      date: "2025-03-19T00:00:00Z",
      value: 3,
      id: "1747087325955",
    },
    {
      date: "2025-03-18T00:00:00Z",
      value: 2,
      id: "1747087325956",
    },
    {
      date: "2025-03-17T00:00:00Z",
      value: 1,
      id: "1747087325957",
    },
    {
      date: "2025-03-16T00:00:00Z",
      value: 5,
      id: "1747087325958",
    },
    {
      date: "2025-03-15T00:00:00Z",
      value: 1,
      id: "1747087325959",
    },
    {
      date: "2025-03-14T00:00:00Z",
      value: 3,
      id: "1747087325960",
    },
    {
      date: "2025-03-13T00:00:00Z",
      value: 1,
      id: "1747087325961",
    },
    {
      date: "2025-03-12T00:00:00Z",
      value: 5,
      id: "1747087325962",
    },
    {
      date: "2025-03-11T00:00:00Z",
      value: 4,
      id: "1747087325963",
    },
    {
      date: "2025-03-10T00:00:00Z",
      value: 1,
      id: "1747087325964",
    },
    {
      date: "2025-03-09T00:00:00Z",
      value: 1,
      id: "1747087325965",
    },
    {
      date: "2025-03-08T00:00:00Z",
      value: 5,
      id: "1747087325966",
    },
    {
      date: "2025-03-07T00:00:00Z",
      value: 5,
      id: "1747087325967",
    },
    {
      date: "2025-03-06T00:00:00Z",
      value: 1,
      id: "1747087325968",
    },
    {
      date: "2025-03-05T00:00:00Z",
      value: 1,
      id: "1747087325969",
    },
    {
      date: "2025-03-04T00:00:00Z",
      value: 4,
      id: "1747087325970",
    },
    {
      date: "2025-03-03T00:00:00Z",
      value: 3,
      id: "1747087325971",
    },
    {
      date: "2025-03-02T00:00:00Z",
      value: 2,
      id: "1747087325972",
    },
    {
      date: "2025-03-01T00:00:00Z",
      value: 2,
      id: "1747087325973",
    },
    {
      date: "2025-02-28T00:00:00Z",
      value: 5,
      id: "1747087325974",
    },
    {
      date: "2025-02-27T00:00:00Z",
      value: 3,
      id: "1747087325975",
    },
    {
      date: "2025-02-26T00:00:00Z",
      value: 2,
      id: "1747087325976",
    },
    {
      date: "2025-02-25T00:00:00Z",
      value: 4,
      id: "1747087325977",
    },
    {
      date: "2025-02-24T00:00:00Z",
      value: 4,
      id: "1747087325978",
    },
    {
      date: "2025-02-23T00:00:00Z",
      value: 2,
      id: "1747087325979",
    },
    {
      date: "2025-02-22T00:00:00Z",
      value: 3,
      id: "1747087325980",
    },
    {
      date: "2025-02-21T00:00:00Z",
      value: 1,
      id: "1747087325981",
    },
    {
      date: "2025-02-20T00:00:00Z",
      value: 3,
      id: "1747087325982",
    },
    {
      date: "2025-02-19T00:00:00Z",
      value: 2,
      id: "1747087325983",
    },
    {
      date: "2025-02-18T00:00:00Z",
      value: 1,
      id: "1747087325984",
    },
    {
      date: "2025-02-17T00:00:00Z",
      value: 1,
      id: "1747087325985",
    },
    {
      date: "2025-02-16T00:00:00Z",
      value: 5,
      id: "1747087325986",
    },
    {
      date: "2025-02-15T00:00:00Z",
      value: 3,
      id: "1747087325987",
    },
    {
      date: "2025-02-14T00:00:00Z",
      value: 2,
      id: "1747087325988",
    },
    {
      date: "2025-02-13T00:00:00Z",
      value: 2,
      id: "1747087325989",
    },
    {
      date: "2025-02-12T00:00:00Z",
      value: 4,
      id: "1747087325990",
    },
    {
      date: "2025-02-11T00:00:00Z",
      value: 2,
      id: "1747087325991",
    },
    {
      date: "2025-02-10T00:00:00Z",
      value: 4,
      id: "1747087325992",
    },
    {
      date: "2025-02-09T00:00:00Z",
      value: 2,
      id: "1747087325993",
    },
    {
      date: "2025-02-08T00:00:00Z",
      value: 2,
      id: "1747087325994",
    },
    {
      date: "2025-02-07T00:00:00Z",
      value: 5,
      id: "1747087325995",
    },
    {
      date: "2025-02-06T00:00:00Z",
      value: 1,
      id: "1747087325996",
    },
    {
      date: "2025-02-05T00:00:00Z",
      value: 2,
      id: "1747087325997",
    },
    {
      date: "2025-02-04T00:00:00Z",
      value: 3,
      id: "1747087325998",
    },
    {
      date: "2025-02-03T00:00:00Z",
      value: 3,
      id: "1747087325999",
    },
    {
      date: "2025-02-02T00:00:00Z",
      value: 1,
      id: "1747087326000",
    },
  ]);
  const [plantType, setPlantType] = useState<PlantType>("flower");
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      date: "2025-05-12T00:00:00Z",
      value: 5,
      id: "1747087325901",
    },
    {
      date: "2025-05-11T00:00:00Z",
      value: 5,
      id: "1747087325902",
    },
    {
      date: "2025-05-10T00:00:00Z",
      value: 4,
      id: "1747087325903",
    },
    {
      date: "2025-05-09T00:00:00Z",
      value: 1,
      id: "1747087325904",
    },
    {
      date: "2025-05-08T00:00:00Z",
      value: 3,
      id: "1747087325905",
    },
    {
      date: "2025-05-07T00:00:00Z",
      value: 4,
      id: "1747087325906",
    },
    {
      date: "2025-05-06T00:00:00Z",
      value: 1,
      id: "1747087325907",
    },
    {
      date: "2025-05-05T00:00:00Z",
      value: 3,
      id: "1747087325908",
    },
    {
      date: "2025-05-04T00:00:00Z",
      value: 5,
      id: "1747087325909",
    },
    {
      date: "2025-05-03T00:00:00Z",
      value: 5,
      id: "1747087325910",
    },
    {
      date: "2025-05-02T00:00:00Z",
      value: 5,
      id: "1747087325911",
    },
    {
      date: "2025-05-01T00:00:00Z",
      value: 2,
      id: "1747087325912",
    },
    {
      date: "2025-04-30T00:00:00Z",
      value: 4,
      id: "1747087325913",
    },
    {
      date: "2025-04-29T00:00:00Z",
      value: 4,
      id: "1747087325914",
    },
    {
      date: "2025-04-28T00:00:00Z",
      value: 1,
      id: "1747087325915",
    },
    {
      date: "2025-04-27T00:00:00Z",
      value: 1,
      id: "1747087325916",
    },
    {
      date: "2025-04-26T00:00:00Z",
      value: 2,
      id: "1747087325917",
    },
    {
      date: "2025-04-25T00:00:00Z",
      value: 1,
      id: "1747087325918",
    },
    {
      date: "2025-04-24T00:00:00Z",
      value: 3,
      id: "1747087325919",
    },
    {
      date: "2025-04-23T00:00:00Z",
      value: 1,
      id: "1747087325920",
    },
    {
      date: "2025-04-22T00:00:00Z",
      value: 1,
      id: "1747087325921",
    },
    {
      date: "2025-04-21T00:00:00Z",
      value: 5,
      id: "1747087325922",
    },
    {
      date: "2025-04-20T00:00:00Z",
      value: 5,
      id: "1747087325923",
    },
    {
      date: "2025-04-19T00:00:00Z",
      value: 5,
      id: "1747087325924",
    },
    {
      date: "2025-04-18T00:00:00Z",
      value: 2,
      id: "1747087325925",
    },
    {
      date: "2025-04-17T00:00:00Z",
      value: 1,
      id: "1747087325926",
    },
    {
      date: "2025-04-16T00:00:00Z",
      value: 2,
      id: "1747087325927",
    },
    {
      date: "2025-04-15T00:00:00Z",
      value: 5,
      id: "1747087325928",
    },
    {
      date: "2025-04-14T00:00:00Z",
      value: 5,
      id: "1747087325929",
    },
    {
      date: "2025-04-13T00:00:00Z",
      value: 4,
      id: "1747087325930",
    },
    {
      date: "2025-04-12T00:00:00Z",
      value: 1,
      id: "1747087325931",
    },
    {
      date: "2025-04-11T00:00:00Z",
      value: 4,
      id: "1747087325932",
    },
    {
      date: "2025-04-10T00:00:00Z",
      value: 5,
      id: "1747087325933",
    },
    {
      date: "2025-04-09T00:00:00Z",
      value: 2,
      id: "1747087325934",
    },
    {
      date: "2025-04-08T00:00:00Z",
      value: 3,
      id: "1747087325935",
    },
    {
      date: "2025-04-07T00:00:00Z",
      value: 4,
      id: "1747087325936",
    },
    {
      date: "2025-04-06T00:00:00Z",
      value: 5,
      id: "1747087325937",
    },
    {
      date: "2025-04-05T00:00:00Z",
      value: 1,
      id: "1747087325938",
    },
    {
      date: "2025-04-04T00:00:00Z",
      value: 4,
      id: "1747087325939",
    },
    {
      date: "2025-04-03T00:00:00Z",
      value: 2,
      id: "1747087325940",
    },
    {
      date: "2025-04-02T00:00:00Z",
      value: 2,
      id: "1747087325941",
    },
    {
      date: "2025-04-01T00:00:00Z",
      value: 3,
      id: "1747087325942",
    },
    {
      date: "2025-03-31T00:00:00Z",
      value: 3,
      id: "1747087325943",
    },
    {
      date: "2025-03-30T00:00:00Z",
      value: 4,
      id: "1747087325944",
    },
    {
      date: "2025-03-29T00:00:00Z",
      value: 3,
      id: "1747087325945",
    },
    {
      date: "2025-03-28T00:00:00Z",
      value: 4,
      id: "1747087325946",
    },
    {
      date: "2025-03-27T00:00:00Z",
      value: 2,
      id: "1747087325947",
    },
    {
      date: "2025-03-26T00:00:00Z",
      value: 5,
      id: "1747087325948",
    },
    {
      date: "2025-03-25T00:00:00Z",
      value: 3,
      id: "1747087325949",
    },
    {
      date: "2025-03-24T00:00:00Z",
      value: 3,
      id: "1747087325950",
    },
    {
      date: "2025-03-23T00:00:00Z",
      value: 4,
      id: "1747087325951",
    },
    {
      date: "2025-03-22T00:00:00Z",
      value: 3,
      id: "1747087325952",
    },
    {
      date: "2025-03-21T00:00:00Z",
      value: 2,
      id: "1747087325953",
    },
    {
      date: "2025-03-20T00:00:00Z",
      value: 3,
      id: "1747087325954",
    },
    {
      date: "2025-03-19T00:00:00Z",
      value: 3,
      id: "1747087325955",
    },
    {
      date: "2025-03-18T00:00:00Z",
      value: 2,
      id: "1747087325956",
    },
    {
      date: "2025-03-17T00:00:00Z",
      value: 1,
      id: "1747087325957",
    },
    {
      date: "2025-03-16T00:00:00Z",
      value: 5,
      id: "1747087325958",
    },
    {
      date: "2025-03-15T00:00:00Z",
      value: 1,
      id: "1747087325959",
    },
    {
      date: "2025-03-14T00:00:00Z",
      value: 3,
      id: "1747087325960",
    },
    {
      date: "2025-03-13T00:00:00Z",
      value: 1,
      id: "1747087325961",
    },
    {
      date: "2025-03-12T00:00:00Z",
      value: 5,
      id: "1747087325962",
    },
    {
      date: "2025-03-11T00:00:00Z",
      value: 4,
      id: "1747087325963",
    },
    {
      date: "2025-03-10T00:00:00Z",
      value: 1,
      id: "1747087325964",
    },
    {
      date: "2025-03-09T00:00:00Z",
      value: 1,
      id: "1747087325965",
    },
    {
      date: "2025-03-08T00:00:00Z",
      value: 5,
      id: "1747087325966",
    },
    {
      date: "2025-03-07T00:00:00Z",
      value: 5,
      id: "1747087325967",
    },
    {
      date: "2025-03-06T00:00:00Z",
      value: 1,
      id: "1747087325968",
    },
    {
      date: "2025-03-05T00:00:00Z",
      value: 1,
      id: "1747087325969",
    },
    {
      date: "2025-03-04T00:00:00Z",
      value: 4,
      id: "1747087325970",
    },
    {
      date: "2025-03-03T00:00:00Z",
      value: 3,
      id: "1747087325971",
    },
    {
      date: "2025-03-02T00:00:00Z",
      value: 2,
      id: "1747087325972",
    },
    {
      date: "2025-03-01T00:00:00Z",
      value: 2,
      id: "1747087325973",
    },
    {
      date: "2025-02-28T00:00:00Z",
      value: 5,
      id: "1747087325974",
    },
    {
      date: "2025-02-27T00:00:00Z",
      value: 3,
      id: "1747087325975",
    },
    {
      date: "2025-02-26T00:00:00Z",
      value: 2,
      id: "1747087325976",
    },
    {
      date: "2025-02-25T00:00:00Z",
      value: 4,
      id: "1747087325977",
    },
    {
      date: "2025-02-24T00:00:00Z",
      value: 4,
      id: "1747087325978",
    },
    {
      date: "2025-02-23T00:00:00Z",
      value: 2,
      id: "1747087325979",
    },
    {
      date: "2025-02-22T00:00:00Z",
      value: 3,
      id: "1747087325980",
    },
    {
      date: "2025-02-21T00:00:00Z",
      value: 1,
      id: "1747087325981",
    },
    {
      date: "2025-02-20T00:00:00Z",
      value: 3,
      id: "1747087325982",
    },
    {
      date: "2025-02-19T00:00:00Z",
      value: 2,
      id: "1747087325983",
    },
    {
      date: "2025-02-18T00:00:00Z",
      value: 1,
      id: "1747087325984",
    },
    {
      date: "2025-02-17T00:00:00Z",
      value: 1,
      id: "1747087325985",
    },
    {
      date: "2025-02-16T00:00:00Z",
      value: 5,
      id: "1747087325986",
    },
    {
      date: "2025-02-15T00:00:00Z",
      value: 3,
      id: "1747087325987",
    },
    {
      date: "2025-02-14T00:00:00Z",
      value: 2,
      id: "1747087325988",
    },
    {
      date: "2025-02-13T00:00:00Z",
      value: 2,
      id: "1747087325989",
    },
    {
      date: "2025-02-12T00:00:00Z",
      value: 4,
      id: "1747087325990",
    },
    {
      date: "2025-02-11T00:00:00Z",
      value: 2,
      id: "1747087325991",
    },
    {
      date: "2025-02-10T00:00:00Z",
      value: 4,
      id: "1747087325992",
    },
    {
      date: "2025-02-09T00:00:00Z",
      value: 2,
      id: "1747087325993",
    },
    {
      date: "2025-02-08T00:00:00Z",
      value: 2,
      id: "1747087325994",
    },
    {
      date: "2025-02-07T00:00:00Z",
      value: 5,
      id: "1747087325995",
    },
    {
      date: "2025-02-06T00:00:00Z",
      value: 1,
      id: "1747087325996",
    },
    {
      date: "2025-02-05T00:00:00Z",
      value: 2,
      id: "1747087325997",
    },
    {
      date: "2025-02-04T00:00:00Z",
      value: 3,
      id: "1747087325998",
    },
    {
      date: "2025-02-03T00:00:00Z",
      value: 3,
      id: "1747087325999",
    },
    {
      date: "2025-02-02T00:00:00Z",
      value: 1,
      id: "1747087326000",
    },
  ]);
  const [plantGrowthLevel, setPlantGrowthLevel] = useState(0);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedEntries = localStorage.getItem("moodEntries");
    const storedPlantType = localStorage.getItem("plantType");
    const storedAchievements = localStorage.getItem("achievements");

    if (storedEntries) {
      setMoodEntries(JSON.parse(storedEntries));
    } else {
      // Initialize with sample data if no entries exist
      setMoodEntries(sampleMoodEntries);
      localStorage.setItem("moodEntries", JSON.stringify(sampleMoodEntries));
    }

    if (storedPlantType) {
      setPlantType(JSON.parse(storedPlantType));
    }

    if (storedAchievements) {
      setAchievements(JSON.parse(storedAchievements));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
    localStorage.setItem("plantType", JSON.stringify(plantType));
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }, [moodEntries, plantType, achievements]);

  // Calculate streaks and plant growth
  useEffect(() => {
    if (moodEntries.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      setPlantGrowthLevel(0);
      return;
    }

    // Sort entries by date (newest first)
    const sortedEntries = [...moodEntries].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Calculate current streak
    let streak = 0;
    let currentDate = new Date();
    const hasTodayEntry = sortedEntries.some((entry) =>
      isToday(new Date(entry.date))
    );

    if (!hasTodayEntry) {
      currentDate = subDays(currentDate, 1);
    } else {
      streak = 1;
    }

    for (let i = hasTodayEntry ? 1 : 0; i < sortedEntries.length; i++) {
      const entryDate = new Date(sortedEntries[i].date);
      const expectedDate = subDays(currentDate, streak);

      if (
        differenceInDays(expectedDate, entryDate) === 0 ||
        differenceInDays(expectedDate, entryDate) === -1
      ) {
        streak++;
        currentDate = entryDate;
      } else {
        break;
      }
    }

    setCurrentStreak(streak);

    // Calculate longest streak
    let maxStreak = streak;
    let tempStreak = 1;

    for (let i = 1; i < sortedEntries.length; i++) {
      const currentEntryDate = new Date(sortedEntries[i].date);
      const prevEntryDate = new Date(sortedEntries[i - 1].date);

      if (differenceInDays(prevEntryDate, currentEntryDate) <= 1) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }

      maxStreak = Math.max(maxStreak, tempStreak);
    }

    setLongestStreak(maxStreak);

    // Calculate plant growth (based on streak and positive moods)
    const positiveEntries = moodEntries.filter(
      (entry) => entry.value >= 4
    ).length;
    const positiveRatio = positiveEntries / Math.max(moodEntries.length, 1);

    const streakFactor = Math.min(currentStreak / 10, 1);
    const entriesFactor = Math.min(moodEntries.length / 30, 1);

    const growth = Math.round(
      (positiveRatio * 0.5 + streakFactor * 0.3 + entriesFactor * 0.2) * 100
    );

    setPlantGrowthLevel(Math.min(growth, 100));

    // Check for achievements
    const newAchievements: Achievement[] = [];

    if (
      moodEntries.length >= 1 &&
      !achievements.some((a) => a.id === "first_log")
    ) {
      newAchievements.push({
        id: "first_log",
        title: "First Steps",
        description: "Log your first mood entry",
        date: new Date().toISOString(),
      });
    }

    if (
      moodEntries.length >= 7 &&
      !achievements.some((a) => a.id === "week_log")
    ) {
      newAchievements.push({
        id: "week_log",
        title: "Week Warrior",
        description: "Log 7 mood entries",
        date: new Date().toISOString(),
      });
    }

    if (currentStreak >= 3 && !achievements.some((a) => a.id === "streak_3")) {
      newAchievements.push({
        id: "streak_3",
        title: "Consistency is Key",
        description: "Maintain a 3-day logging streak",
        date: new Date().toISOString(),
      });
    }

    if (currentStreak >= 7 && !achievements.some((a) => a.id === "streak_7")) {
      newAchievements.push({
        id: "streak_7",
        title: "Week Champion",
        description: "Maintain a 7-day logging streak",
        date: new Date().toISOString(),
      });
    }

    if (
      plantGrowthLevel >= 50 &&
      !achievements.some((a) => a.id === "growth_50")
    ) {
      newAchievements.push({
        id: "growth_50",
        title: "Growing Strong",
        description: "Reach 50% plant growth",
        date: new Date().toISOString(),
      });
    }

    if (
      plantGrowthLevel >= 100 &&
      !achievements.some((a) => a.id === "growth_100")
    ) {
      newAchievements.push({
        id: "growth_100",
        title: "Full Bloom",
        description: "Reach 100% plant growth",
        date: new Date().toISOString(),
      });
    }

    if (newAchievements.length > 0) {
      setAchievements((prev) => [...prev, ...newAchievements]);
    }
  }, [moodEntries, achievements]);

  const addMoodEntry = (entry: Omit<MoodEntry, "id">) => {
    const newEntry: MoodEntry = {
      ...entry,
      id: Date.now().toString(),
    };

    setMoodEntries((prev) => {
      // Check if an entry for today already exists
      const todayEntryIndex = prev.findIndex((e) => isToday(new Date(e.date)));

      if (todayEntryIndex !== -1) {
        // Replace today's entry
        const updatedEntries = [...prev];
        updatedEntries[todayEntryIndex] = newEntry;
        return updatedEntries;
      } else {
        // Add new entry
        return [...prev, newEntry];
      }
    });
  };

  const deleteMoodEntry = (id: string) => {
    setMoodEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const todaysMood =
    moodEntries.find((entry) => isToday(new Date(entry.date))) || null;

  return (
    <MoodContext.Provider
      value={{
        moodEntries,
        addMoodEntry,
        deleteMoodEntry,
        todaysMood,
        plantType,
        setPlantType,
        plantGrowthLevel,
        currentStreak,
        longestStreak,
        achievements,
      }}
    >
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextProps => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error("useMood must be used within a MoodProvider");
  }
  return context;
};
