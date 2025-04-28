
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { AttendanceRecord } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface EditAttendanceDialogProps {
  record: AttendanceRecord;
  onUpdate: (recordId: string, newStatus: AttendanceRecord['status']) => void;
}

const EditAttendanceDialog: React.FC<EditAttendanceDialogProps> = ({ record, onUpdate }) => {
  const [status, setStatus] = React.useState<AttendanceRecord['status']>(record.status);
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const handleSave = () => {
    onUpdate(record.id, status);
    setOpen(false);
    toast({
      title: "Attendance Updated",
      description: "The attendance record has been successfully updated.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-muted">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit attendance</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Attendance</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">Student Attendance Status</h4>
            <RadioGroup value={status} onValueChange={(value: AttendanceRecord['status']) => setStatus(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="present" id="present" />
                <Label htmlFor="present">Present</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="late" id="late" />
                <Label htmlFor="late">Late</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="absent" id="absent" />
                <Label htmlFor="absent">Absent</Label>
              </div>
            </RadioGroup>
          </div>
          <Button onClick={handleSave} className="w-full">Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditAttendanceDialog;
