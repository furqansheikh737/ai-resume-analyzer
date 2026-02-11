import { Upload } from 'lucide-react';

export const UploadZone = ({ onUpload, disabled }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      // Yahan hum direct file bhej rahe hain backend ko
      const formData = new FormData();
      formData.append('file', file);
      onUpload(formData);
    }
  };

  return (
    <div className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-colors 
      ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'hover:border-blue-500 hover:bg-blue-50/50'}`}>
      <input 
        type="file" 
        accept=".pdf" 
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
        disabled={disabled}
      />
      <div className="space-y-4">
        <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto">
          <Upload className="text-blue-600" size={32} />
        </div>
        <div>
          <p className="text-lg font-medium">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 font-normal">PDF (MAX. 5MB)</p>
        </div>
      </div>
    </div>
  );
};