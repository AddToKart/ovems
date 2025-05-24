import React, { useState } from 'react';
import FormSection from '../../components/forms/FormSection';
import FormRow from '../../components/forms/FormRow';
import FormActions from '../../components/forms/FormActions';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import DatePicker from '../../components/ui/DatePicker';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';

const electionTypes = [
  { value: 'general', label: 'General Election' },
  { value: 'primary', label: 'Primary Election' },
  { value: 'special', label: 'Special Election' },
  { value: 'local', label: 'Local Election' },
  { value: 'referendum', label: 'Referendum' },
];

const CreateElection: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'general',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    isPublic: true,
    allowAbsenteeVoting: false,
    requiresIdentification: true,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Election title is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    if (!formData.registrationDeadline) {
      newErrors.registrationDeadline = 'Registration deadline is required';
    } else if (formData.startDate && new Date(formData.registrationDeadline) >= new Date(formData.startDate)) {
      newErrors.registrationDeadline = 'Registration deadline must be before start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to API
      console.log('Form submitted:', formData);
      alert('Election created successfully!');
      // Reset form or redirect
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Create New Election</h1>
        <p className="text-gray-600 mt-1">Set up a new election with all required information.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormSection 
          title="Basic Information" 
          description="Enter the general details about this election."
        >
          <FormRow>
            <Input
              id="title"
              name="title"
              label="Election Title"
              placeholder="e.g., City Council Election 2025"
              value={formData.title}
              onChange={handleChange}
              error={errors.title}
              fullWidth
              required
            />
          </FormRow>
          
          <FormRow>
            <TextArea
              id="description"
              name="description"
              label="Description"
              placeholder="Provide details about this election..."
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              fullWidth
            />
          </FormRow>
          
          <FormRow columns={2}>
            <Select
              id="type"
              name="type"
              label="Election Type"
              options={electionTypes}
              value={formData.type}
              onChange={handleChange}
              error={errors.type}
              fullWidth
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Schedule" 
          description="Set the timeline for this election."
        >
          <FormRow columns={3}>
            <DatePicker
              id="registrationDeadline"
              name="registrationDeadline"
              label="Registration Deadline"
              value={formData.registrationDeadline}
              onChange={handleChange}
              error={errors.registrationDeadline}
              fullWidth
              required
            />
            
            <DatePicker
              id="startDate"
              name="startDate"
              label="Start Date"
              value={formData.startDate}
              onChange={handleChange}
              error={errors.startDate}
              fullWidth
              required
            />
            
            <DatePicker
              id="endDate"
              name="endDate"
              label="End Date"
              value={formData.endDate}
              onChange={handleChange}
              error={errors.endDate}
              fullWidth
              required
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Settings" 
          description="Configure additional options for this election."
        >
          <FormRow>
            <div className="space-y-4">
              <Checkbox
                id="isPublic"
                name="isPublic"
                label="Make this election publicly visible"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              
              <Checkbox
                id="allowAbsenteeVoting"
                name="allowAbsenteeVoting"
                label="Allow absentee/remote voting"
                checked={formData.allowAbsenteeVoting}
                onChange={handleChange}
              />
              
              <Checkbox
                id="requiresIdentification"
                name="requiresIdentification"
                label="Require voter identification"
                checked={formData.requiresIdentification}
                onChange={handleChange}
              />
            </div>
          </FormRow>
        </FormSection>
        
        <FormActions>
          <Button type="button" variant="secondary" className="mr-4">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Election
          </Button>
        </FormActions>
      </form>
    </div>
  );
};

export default CreateElection; 