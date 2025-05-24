import React, { useState } from 'react';
import FormSection from '../../components/forms/FormSection';
import FormRow from '../../components/forms/FormRow';
import FormActions from '../../components/forms/FormActions';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import DatePicker from '../../components/ui/DatePicker';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';


const idTypes = [
  { value: 'nationalId', label: 'National ID' },
  { value: 'passport', label: 'Passport' },
  { value: 'driverLicense', label: 'Driver\'s License' },
  { value: 'voterCard', label: 'Voter Card' },
];

const CreateVoter: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    idType: 'nationalId',
    idNumber: '',
    isActive: true,
    hasVoted: false,
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = 'Voter must be at least 18 years old';
      }
    }
    
    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'ID number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Submit form data to API
      console.log('Form submitted:', formData);
      alert('Voter registered successfully!');
      // Reset form or redirect
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Register New Voter</h1>
        <p className="text-gray-600 mt-1">Add a new voter to the system.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <FormSection 
          title="Personal Information" 
          description="Enter the voter's personal details."
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
          
          <FormRow>
            <DatePicker
              id="dateOfBirth"
              name="dateOfBirth"
              label="Date of Birth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              error={errors.dateOfBirth}
              fullWidth
              required
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Address" 
          description="Enter the voter's residential address."
        >
          <FormRow>
            <Input
              id="address"
              name="address"
              label="Street Address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              fullWidth
            />
          </FormRow>
          
          <FormRow columns={3}>
            <Input
              id="city"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              fullWidth
            />
            
            <Input
              id="state"
              name="state"
              label="State/Province"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              fullWidth
            />
            
            <Input
              id="postalCode"
              name="postalCode"
              label="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              error={errors.postalCode}
              fullWidth
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Identification" 
          description="Enter the voter's identification details."
        >
          <FormRow columns={2}>
            <Select
              id="idType"
              name="idType"
              label="ID Type"
              options={idTypes}
              value={formData.idType}
              onChange={handleChange}
              error={errors.idType}
              fullWidth
            />
            
            <Input
              id="idNumber"
              name="idNumber"
              label="ID Number"
              value={formData.idNumber}
              onChange={handleChange}
              error={errors.idNumber}
              fullWidth
              required
            />
          </FormRow>
        </FormSection>
        
        <FormSection 
          title="Status" 
          description="Set the voter's current status."
        >
          <FormRow>
            <div className="space-y-4">
              <Checkbox
                id="isActive"
                name="isActive"
                label="Voter is active and eligible to vote"
                checked={formData.isActive}
                onChange={handleChange}
              />
              
              <Checkbox
                id="hasVoted"
                name="hasVoted"
                label="Voter has already voted in current elections"
                checked={formData.hasVoted}
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
            Register Voter
          </Button>
        </FormActions>
      </form>
    </div>
  );
};

export default CreateVoter; 