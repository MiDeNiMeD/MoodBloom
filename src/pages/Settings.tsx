import React from "react";
import { motion } from "framer-motion";
import { useMood } from "../contexts/MoodContext";
import { PlantType } from "../types";

const PlantOption: React.FC<{
  type: PlantType;
  emoji: string;
  name: string;
  selected: boolean;
  onSelect: () => void;
}> = ({ type, emoji, name, selected, onSelect }) => (
  <motion.button
    className={`p-4 rounded-lg border ${
      selected
        ? "border-primary-400 bg-primary-50 ring-2 ring-primary-400 ring-offset-2"
        : "border-neutral-200 bg-white hover:bg-neutral-50"
    }`}
    onClick={onSelect}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex flex-col items-center">
      <span className="text-5xl mb-2">{emoji}</span>
      <span className="font-medium">{name}</span>
    </div>
  </motion.button>
);

const Settings: React.FC = () => {
  const { plantType, setPlantType, moodEntries } = useMood();

  const resetPlantProgress = () => {
    if (
      confirm(
        "Are you sure you want to reset your plant? This will not delete your mood entries."
      )
    ) {
      // Re-initialize plant progress
      localStorage.setItem("plantGrowthLevel", "0");
      window.location.reload();
    }
  };

  const clearAllData = () => {
    if (confirm("Are you sure you want to clear all your data?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const exportData = () => {
    const data = {
      moodEntries,
      plantType,
      exportDate: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `moodbloom-export-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-neutral-800">Settings</h1>

      <div className="card mb-6">
        <h2 className="text-xl font-medium mb-4 text-neutral-700">
          Choose Your Plant
        </h2>

        <p className="text-neutral-600 mb-4">
          Select the type of plant you'd like to grow based on your mood
          entries.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <PlantOption
            type="flower"
            emoji="🌻"
            name="Flower"
            selected={plantType === "flower"}
            onSelect={() => setPlantType("flower")}
          />
          <PlantOption
            type="tree"
            emoji="🌳"
            name="Tree"
            selected={plantType === "tree"}
            onSelect={() => setPlantType("tree")}
          />
          <PlantOption
            type="cactus"
            emoji="🌵"
            name="Cactus"
            selected={plantType === "cactus"}
            onSelect={() => setPlantType("cactus")}
          />
        </div>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-medium mb-4 text-neutral-700">
          Data Management
        </h2>

        <div className="space-y-4">
          <div>
            <button className="btn-secondary w-full" onClick={exportData}>
              Export Your Data
            </button>
            <p className="text-sm text-neutral-500 mt-1">
              Download all your mood entries and settings as a JSON file.
            </p>
          </div>

          <div>
            <button className="btn-outline w-full" onClick={resetPlantProgress}>
              Reset Plant Progress
            </button>
            <p className="text-sm text-neutral-500 mt-1">
              Start your plant growth from the beginning while keeping your mood
              entries.
            </p>
          </div>

          <div>
            <button
              className="btn w-full bg-error-400 hover:bg-error-500 text-white focus:ring-error-300"
              onClick={clearAllData}
            >
              Clear All Data
            </button>
            <p className="text-sm text-neutral-500 mt-1">
              Permanently delete all your mood entries and reset settings.
            </p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-medium mb-4 text-neutral-700">
          About MoodBloom
        </h2>

        <p className="text-neutral-600 mb-2">
          MoodBloom helps you track your daily moods while visualizing your
          emotional well-being through a growing plant.
        </p>

        <p className="text-neutral-600 mb-4">
          The healthier your mood patterns, the more your plant will flourish!
        </p>

        <p className="text-sm text-neutral-500">
          Version Beta 1.0.0 Created by Mideni Mohamed Amine
        </p>
      </div>
    </div>
  );
};

export default Settings;
