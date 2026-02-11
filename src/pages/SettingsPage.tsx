import { Shield, Users, Lock, Bell, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const SettingsPage = () => {
  return (
    <>
      {/* Page Title */}
      <div className="space-y-1">
        <h2 className="text-xl font-black text-foreground tracking-tight">Settings</h2>
        <p className="text-xs text-muted-foreground">Privacy, sharing, and preferences.</p>
      </div>

      {/* Shared Executive */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Users className="w-4 h-4 text-primary" />
            Shared Executive
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Dashboard</p>
              <p className="text-[10px] text-muted-foreground">Allow your coach to view your stats</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Meal Log</p>
              <p className="text-[10px] text-muted-foreground">Nutritionist can review your meals</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Share Vitality Data</p>
              <p className="text-[10px] text-muted-foreground">Sleep & step data visible to team</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* GDPR Privacy */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Shield className="w-4 h-4 text-primary" />
            GDPR Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start text-xs font-semibold h-10 border-border text-foreground">
            <FileText className="w-4 h-4 mr-2 text-primary" />
            Download My Data
          </Button>
          <Button variant="outline" className="w-full justify-start text-xs font-semibold h-10 border-border text-foreground">
            <Lock className="w-4 h-4 mr-2 text-primary" />
            Manage Consent Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start text-xs font-semibold h-10 border-destructive text-destructive hover:bg-destructive/10">
            <Shield className="w-4 h-4 mr-2" />
            Request Data Deletion
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
            <Bell className="w-4 h-4 text-primary" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">AI Insights</p>
              <p className="text-[10px] text-muted-foreground">Get notified of new recommendations</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-foreground">Workout Reminders</p>
              <p className="text-[10px] text-muted-foreground">Daily workout schedule alerts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default SettingsPage;
