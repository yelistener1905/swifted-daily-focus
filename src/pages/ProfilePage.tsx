import { Settings, BookOpen, Clock, Award, ChevronRight } from "lucide-react";

const stats = [
  { icon: BookOpen, label: "Lessons", value: "42" },
  { icon: Clock, label: "Hours", value: "18" },
  { icon: Award, label: "Completed", value: "3" },
];

const menuItems = [
  { label: "Learning Preferences", icon: Settings },
  { label: "Download History", icon: BookOpen },
  { label: "Time Settings", icon: Clock },
];

export default function ProfilePage() {
  return (
    <div className="px-5 pt-12 pb-6">
      {/* Header */}
      <header className="mb-8 animate-fade-in">
        <h1 className="text-2xl font-bold text-foreground">
          Profile
        </h1>
      </header>

      {/* User Info */}
      <section className="learning-card mb-6 animate-slide-up">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">S</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Learner</h2>
            <p className="text-sm text-muted-foreground">Learning since Jan 2025</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-8">
        <h2 className="section-title mb-4">Your Progress</h2>
        <div className="grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, label, value }, index) => (
            <div 
              key={index}
              className="learning-card text-center py-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Icon size={20} className="mx-auto mb-2 text-primary" />
              <p className="text-xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu */}
      <section>
        <h2 className="section-title mb-4">Settings</h2>
        <div className="space-y-2">
          {menuItems.map(({ label, icon: Icon }, index) => (
            <button
              key={index}
              className="learning-card w-full flex items-center justify-between animate-slide-up"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{label}</span>
              </div>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
