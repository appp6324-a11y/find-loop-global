import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  X,
  MapPin,
  DollarSign,
  Image as ImageIcon,
  FileText,
  Eye,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/mockData';
import { cn } from '@/lib/utils';

type Step = 'category' | 'details' | 'images' | 'pricing' | 'preview';

export default function PostAdPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('category');
  const [formData, setFormData] = useState({
    categoryId: '',
    subcategoryId: '',
    title: '',
    description: '',
    country: 'United States',
    city: '',
    area: '',
    images: [] as string[],
    price: '',
    priceType: 'fixed' as 'fixed' | 'negotiable' | 'free' | 'contact',
    currency: 'USD',
    attributes: {} as Record<string, string>,
  });

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: 'category', label: 'Category', icon: FileText },
    { id: 'details', label: 'Details', icon: FileText },
    { id: 'images', label: 'Images', icon: ImageIcon },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'preview', label: 'Preview', icon: Eye },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);
  const selectedCategory = categories.find((c) => c.id === formData.categoryId);

  const canProceed = () => {
    switch (currentStep) {
      case 'category':
        return !!formData.categoryId;
      case 'details':
        return formData.title.length >= 10 && formData.description.length >= 20 && !!formData.city;
      case 'images':
        return formData.images.length > 0;
      case 'pricing':
        return formData.priceType === 'free' || formData.priceType === 'contact' || !!formData.price;
      default:
        return true;
    }
  };

  const handleNext = () => {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) setCurrentStep(nextStep.id);
  };

  const handleBack = () => {
    const prevStep = steps[currentStepIndex - 1];
    if (prevStep) setCurrentStep(prevStep.id);
  };

  const handleSubmit = () => {
    // Mock submission
    console.log('Submitting:', formData);
    navigate('/dashboard/listings?posted=true');
  };

  const addMockImage = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
    ];
    if (formData.images.length < 6) {
      setFormData({
        ...formData,
        images: [...formData.images, mockImages[formData.images.length % mockImages.length]],
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1 py-8">
        <div className="page-container max-w-4xl">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-full transition-colors',
                      currentStepIndex === index
                        ? 'bg-primary text-primary-foreground'
                        : currentStepIndex > index
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {currentStepIndex > index ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                    <span className="font-medium hidden sm:inline">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-8 md:w-16 h-0.5 mx-2',
                        currentStepIndex > index ? 'bg-success' : 'bg-border'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-card rounded-2xl border border-border shadow-sm">
            {/* Category Step */}
            {currentStep === 'category' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Select a Category</h2>
                <p className="text-muted-foreground mb-8">
                  Choose the category that best describes your listing
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() =>
                        setFormData({ ...formData, categoryId: category.id, subcategoryId: '' })
                      }
                      className={cn(
                        'p-4 rounded-xl border-2 text-left transition-all hover:shadow-md',
                        formData.categoryId === category.id
                          ? 'border-primary bg-primary-light'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                    </button>
                  ))}
                </div>

                {selectedCategory?.subcategories && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Subcategory</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCategory.subcategories.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setFormData({ ...formData, subcategoryId: sub.id })}
                          className={cn(
                            'px-4 py-2 rounded-lg border transition-colors',
                            formData.subcategoryId === sub.id
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-border hover:border-primary'
                          )}
                        >
                          {sub.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details Step */}
            {currentStep === 'details' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Listing Details</h2>
                <p className="text-muted-foreground mb-8">
                  Provide information about your listing
                </p>

                <div className="space-y-6">
                  <div>
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., iPhone 15 Pro Max - Excellent Condition"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="form-input"
                      maxLength={100}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.title.length}/100 characters (min 10)
                    </p>
                  </div>

                  <div>
                    <label className="form-label">Description *</label>
                    <textarea
                      placeholder="Describe your item in detail..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="form-input min-h-32"
                      maxLength={5000}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.description.length}/5000 characters (min 20)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label">Country *</label>
                      <select
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        className="form-input"
                      >
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        placeholder="e.g., New York"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div>
                      <label className="form-label">Area (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g., Manhattan"
                        value={formData.area}
                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Images Step */}
            {currentStep === 'images' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Add Photos</h2>
                <p className="text-muted-foreground mb-8">
                  Add up to 6 photos. The first image will be the cover.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((img, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() =>
                          setFormData({
                            ...formData,
                            images: formData.images.filter((_, i) => i !== index),
                          })
                        }
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {index === 0 && (
                        <span className="absolute bottom-2 left-2 px-2 py-1 rounded bg-primary text-primary-foreground text-xs font-medium">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}

                  {formData.images.length < 6 && (
                    <button
                      onClick={addMockImage}
                      className="aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary-light/50 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                    >
                      <Upload className="w-8 h-8" />
                      <span className="text-sm font-medium">Add Photo</span>
                    </button>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                  Click "Add Photo" to add mock images for demo purposes
                </p>
              </div>
            )}

            {/* Pricing Step */}
            {currentStep === 'pricing' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Set Your Price</h2>
                <p className="text-muted-foreground mb-8">How would you like to price this listing?</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: 'fixed', label: 'Fixed Price' },
                      { value: 'negotiable', label: 'Negotiable' },
                      { value: 'free', label: 'Free' },
                      { value: 'contact', label: 'Contact Me' },
                    ].map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          setFormData({
                            ...formData,
                            priceType: type.value as typeof formData.priceType,
                          })
                        }
                        className={cn(
                          'p-4 rounded-xl border-2 text-center transition-all',
                          formData.priceType === type.value
                            ? 'border-primary bg-primary-light'
                            : 'border-border hover:border-primary/50'
                        )}
                      >
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>

                  {(formData.priceType === 'fixed' || formData.priceType === 'negotiable') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Price *</label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="number"
                            placeholder="0.00"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            className="form-input pl-10"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="form-label">Currency</label>
                        <select
                          value={formData.currency}
                          onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                          className="form-input"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview Step */}
            {currentStep === 'preview' && (
              <div className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Preview Your Listing</h2>
                <p className="text-muted-foreground mb-8">Review your listing before publishing</p>

                <div className="border border-border rounded-xl overflow-hidden">
                  {formData.images[0] && (
                    <img
                      src={formData.images[0]}
                      alt=""
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {formData.title || 'Untitled Listing'}
                    </h3>
                    <p className="text-2xl font-bold text-primary mb-4">
                      {formData.priceType === 'free'
                        ? 'Free'
                        : formData.priceType === 'contact'
                        ? 'Contact for price'
                        : `${formData.currency} ${Number(formData.price).toLocaleString()}`}
                      {formData.priceType === 'negotiable' && ' (Negotiable)'}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      {formData.city}, {formData.country}
                    </div>
                    <p className="text-muted-foreground">{formData.description}</p>
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl bg-success-light">
                  <p className="text-sm text-success font-medium">
                    ✓ Your listing looks great! Click "Publish" to make it live.
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="px-8 py-6 border-t border-border flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              {currentStep === 'preview' ? (
                <Button onClick={handleSubmit} className="btn-primary gap-2">
                  <Check className="w-4 h-4" />
                  Publish Listing
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!canProceed()} className="btn-primary gap-2">
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
