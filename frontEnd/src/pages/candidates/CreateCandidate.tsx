import React, { useState } from 'react';
import FormSection from '../../components/forms/FormSection';
import FormRow from '../../components/forms/FormRow';
import FormActions from '../../components/forms/FormActions';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';

const partyOptions = [
  { value: 'independent', label: 'Independent' },
  { value: 'democratic', label: 'Democratic Party' },
  { value: 'republican', label: 'Republican Party' },
  { value: 'green', label: 'Green Party' },
  { value: 'libertarian', label: 'Libertarian Party' },
];

const electionOptions = [
  { value: '1', label: 'City Council Election 2025' },
  { value: '2', label: 'Student Body President' },
];

const positionOptions = [
  { value: 'mayor', label: 'Mayor' },
  { value: 'councilMember', label: 'Council Member' },
  { value: 'president', label: 'President' },
  { value: 'vicePresident', label: 'Vice President' },
  { value: 'secretary', label: 'Secretary' },
  { value: 'treasurer', label: 'Treasurer' },
];

const CreateCandidate: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    party: 'independent',
    position: '',
    electionId: '',
    bio: '',
    manifesto: '',
    imageUrl: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.electionId) {
      newErrors.electionId = 'Please select an election';
    }
    
    if (!formData.position) {
      newErrors.position = 'Please select a position';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to API
      console.log('Form submitted:', formData);
      alert('Candidate registered successfully!');
      // Reset form or redirect
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Register New Candidate</h1>
        <p className="text-gray-600 mt-1">Add a new candidate to an election.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormSection 
          title="Personal Information" 
          description="Enter the candidate's personal details."
        >
          <FormRow columns={2}>
            <Input
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
              error={errors.firstName}
              fullWidth
              required
            />
            
            <Input
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              error={errors.lastName}
              fullWidth
              required
            />
          </FormRow>
          
          <FormRow columns={2}>
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              fullWidth
              required
            />
            
            <Input
              id="phone"
              name="phone"
              type="tel"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              fullWidth
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Election Details" 
          description="Select the election and position for this candidate."
        >
          <FormRow columns={2}>
            <Select
              id="electionId"
              name="electionId"
              label="Election"
              options={electionOptions}
              value={formData.electionId}
              onChange={handleChange}
              error={errors.electionId}
              fullWidth
              required
            />
            
            <Select
              id="position"
              name="position"
              label="Position"
              options={positionOptions}
              value={formData.position}
              onChange={handleChange}
              error={errors.position}
              fullWidth
              required
            />
          </FormRow>
          
          <FormRow>
            <Select
              id="party"
              name="party"
              label="Political Party"
              options={partyOptions}
              value={formData.party}
              onChange={handleChange}
              error={errors.party}
              fullWidth
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Profile" 
          description="Enter the candidate's biography and platform."
        >
          <FormRow>
            <TextArea
              id="bio"
              name="bio"
              label="Biography"
              placeholder="Brief biography of the candidate..."
              value={formData.bio}
              onChange={handleChange}
              error={errors.bio}
              fullWidth
              rows={3}
            />
          </FormRow>
          
          <FormRow>
            <TextArea
              id="manifesto"
              name="manifesto"
              label="Manifesto/Platform"
              placeholder="Candidate's election promises and platform..."
              value={formData.manifesto}
              onChange={handleChange}
              error={errors.manifesto}
              fullWidth
              rows={5}
            />
          </FormRow>
          
          <FormRow>
            <Input
              id="imageUrl"
              name="imageUrl"
              label="Profile Image URL"
              placeholder="https://example.com/candidate-image.jpg"
              value={formData.imageUrl}
              onChange={handleChange}
              error={errors.imageUrl}
              fullWidth
            />
          </FormRow>
        </FormSection>
        
        <FormActions>
          <Button type="button" variant="secondary" className="mr-4">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Register Candidate
          </Button>
        </FormActions>
      </form>
    </div>
  );
};

export default CreateCandidate; 