import { useState } from 'react'
import QRCode from 'qrcode'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { FileUser, Download, QrCode, Image, ChevronRight, ChevronLeft } from 'lucide-react'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [qrCodeUrl, setQrCodeUrl] = useState(null)
  const [formData, setFormData] = useState({
    // البيانات الشخصية
    fullName: '',
    email: '',
    phone: '',
    address: '',
    profileImage: null,
    
    // المعلومات المهنية
    jobTitle: '',
    summary: '',
    
    // الخبرات العملية
    experiences: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      }
    ],
    
    // التعليم
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        graduationYear: '',
        gpa: ''
      }
    ],
    
    // المهارات
    skills: [''],
    
    // اللغات
    languages: [
      {
        language: '',
        level: ''
      }
    ],
    
    // الشهادات
    certifications: [
      {
        name: '',
        issuer: '',
        date: ''
      }
    ]
  })

  const steps = [
    {
      title: 'البيانات الشخصية',
      description: 'أدخل معلوماتك الشخصية الأساسية',
      icon: FileUser
    },
    {
      title: 'المعلومات المهنية',
      description: 'أضف المسمى الوظيفي والملخص المهني',
      icon: FileUser
    },
    {
      title: 'الخبرات العملية',
      description: 'أضف خبراتك العملية السابقة',
      icon: FileUser
    },
    {
      title: 'التعليم والمؤهلات',
      description: 'أضف مؤهلاتك التعليمية',
      icon: FileUser
    },
    {
      title: 'المهارات واللغات',
      description: 'أضف مهاراتك واللغات التي تتقنها',
      icon: FileUser
    },
    {
      title: 'معاينة وتحميل',
      description: 'راجع سيرتك الذاتية وحملها',
      icon: Download
    }
  ]

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addArrayItem = (field, newItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], newItem]
    }))
  }

  const updateArrayItem = (field, index, newItem) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? newItem : item)
    }))
  }

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">الاسم الكامل *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData('fullName', e.target.value)}
            placeholder="أدخل اسمك الكامل"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="email">البريد الإلكتروني *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="example@email.com"
            className="mt-1"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">رقم الهاتف *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="+966 50 123 4567"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="address">العنوان</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            placeholder="المدينة، البلد"
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="profileImage">الصورة الشخصية</Label>
        <Input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={(e) => updateFormData('profileImage', e.target.files[0])}
          className="mt-1"
        />
        <p className="text-sm text-muted-foreground mt-1">
          اختر صورة احترافية بخلفية بيضاء أو ملونة مناسبة
        </p>
      </div>
    </div>
  )

  const renderProfessionalInfo = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="jobTitle">المسمى الوظيفي المطلوب *</Label>
        <Input
          id="jobTitle"
          value={formData.jobTitle}
          onChange={(e) => updateFormData('jobTitle', e.target.value)}
          placeholder="مطور ويب، مهندس برمجيات، مصمم جرافيك..."
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="summary">الملخص المهني *</Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => updateFormData('summary', e.target.value)}
          placeholder="اكتب ملخصاً مهنياً يبرز خبراتك ومهاراتك الرئيسية في 2-3 جمل..."
          className="mt-1 min-h-[120px]"
        />
        <p className="text-sm text-muted-foreground mt-1">
          اكتب ملخصاً موجزاً يبرز أهم إنجازاتك ومهاراتك
        </p>
      </div>
    </div>
  )

  const renderExperiences = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">الخبرات العملية</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('experiences', {
            company: '',
            position: '',
            startDate: '',
            endDate: '',
            description: ''
          })}
          className="text-sm"
        >
          إضافة خبرة جديدة
        </Button>
      </div>
      
      {formData.experiences.map((exp, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">الخبرة {index + 1}</h4>
              {formData.experiences.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('experiences', index)}
                >
                  حذف
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>اسم الشركة *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateArrayItem('experiences', index, {...exp, company: e.target.value})}
                  placeholder="شركة التقنية المتقدمة"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>المسمى الوظيفي *</Label>
                <Input
                  value={exp.position}
                  onChange={(e) => updateArrayItem('experiences', index, {...exp, position: e.target.value})}
                  placeholder="مطور ويب أول"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>تاريخ البداية *</Label>
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => updateArrayItem('experiences', index, {...exp, startDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>تاريخ النهاية</Label>
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => updateArrayItem('experiences', index, {...exp, endDate: e.target.value})}
                  className="mt-1"
                  placeholder="اتركه فارغاً إذا كنت تعمل حالياً"
                />
              </div>
            </div>
            
            <div>
              <Label>وصف المهام والإنجازات</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateArrayItem('experiences', index, {...exp, description: e.target.value})}
                placeholder="اكتب وصفاً موجزاً لمهامك وإنجازاتك في هذا المنصب..."
                className="mt-1 min-h-[100px]"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderEducation = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">التعليم والمؤهلات</h3>
        <Button
          type="button"
          variant="outline"
          onClick={() => addArrayItem('education', {
            institution: '',
            degree: '',
            field: '',
            graduationYear: '',
            gpa: ''
          })}
          className="text-sm"
        >
          إضافة مؤهل جديد
        </Button>
      </div>
      
      {formData.education.map((edu, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">المؤهل {index + 1}</h4>
              {formData.education.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('education', index)}
                >
                  حذف
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>اسم المؤسسة التعليمية *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateArrayItem('education', index, {...edu, institution: e.target.value})}
                  placeholder="جامعة الملك سعود"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>الدرجة العلمية *</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => updateArrayItem('education', index, {...edu, degree: e.target.value})}
                  placeholder="بكالوريوس، ماجستير، دكتوراه..."
                  className="mt-1"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>التخصص *</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => updateArrayItem('education', index, {...edu, field: e.target.value})}
                  placeholder="علوم الحاسب، هندسة البرمجيات..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label>سنة التخرج</Label>
                <Input
                  value={edu.graduationYear}
                  onChange={(e) => updateArrayItem('education', index, {...edu, graduationYear: e.target.value})}
                  placeholder="2020"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label>المعدل التراكمي (اختياري)</Label>
              <Input
                value={edu.gpa}
                onChange={(e) => updateArrayItem('education', index, {...edu, gpa: e.target.value})}
                placeholder="3.8 من 4.0"
                className="mt-1"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  const renderSkillsAndLanguages = () => (
    <div className="space-y-8">
      {/* المهارات */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">المهارات التقنية والمهنية</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => addArrayItem('skills', '')}
            className="text-sm"
          >
            إضافة مهارة
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={skill}
                onChange={(e) => updateArrayItem('skills', index, e.target.value)}
                placeholder="JavaScript، React، Python..."
                className="flex-1"
              />
              {formData.skills.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('skills', index)}
                >
                  حذف
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* اللغات */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">اللغات</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => addArrayItem('languages', { language: '', level: '' })}
            className="text-sm"
          >
            إضافة لغة
          </Button>
        </div>
        
        {formData.languages.map((lang, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label>اللغة</Label>
                <Input
                  value={lang.language}
                  onChange={(e) => updateArrayItem('languages', index, {...lang, language: e.target.value})}
                  placeholder="العربية، الإنجليزية، الفرنسية..."
                  className="mt-1"
                />
              </div>
              <div className="flex-1">
                <Label>مستوى الإتقان</Label>
                <Input
                  value={lang.level}
                  onChange={(e) => updateArrayItem('languages', index, {...lang, level: e.target.value})}
                  placeholder="ممتاز، جيد جداً، متوسط..."
                  className="mt-1"
                />
              </div>
              {formData.languages.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArrayItem('languages', index)}
                >
                  حذف
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* الشهادات */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">الشهادات والدورات</h3>
          <Button
            type="button"
            variant="outline"
            onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
            className="text-sm"
          >
            إضافة شهادة
          </Button>
        </div>
        
        {formData.certifications.map((cert, index) => (
          <Card key={index} className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">الشهادة {index + 1}</h4>
                {formData.certifications.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeArrayItem('certifications', index)}
                  >
                    حذف
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>اسم الشهادة</Label>
                  <Input
                    value={cert.name}
                    onChange={(e) => updateArrayItem('certifications', index, {...cert, name: e.target.value})}
                    placeholder="شهادة AWS، Google Analytics..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label>الجهة المانحة</Label>
                  <Input
                    value={cert.issuer}
                    onChange={(e) => updateArrayItem('certifications', index, {...cert, issuer: e.target.value})}
                    placeholder="Amazon، Google، Microsoft..."
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label>تاريخ الحصول على الشهادة</Label>
                <Input
                  type="date"
                  value={cert.date}
                  onChange={(e) => updateArrayItem('certifications', index, {...cert, date: e.target.value})}
                  className="mt-1"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )

  const renderPreview = () => {
    const formatDate = (dateStr) => {
      if (!dateStr) return 'حتى الآن'
      const date = new Date(dateStr)
      return date.toLocaleDateString('ar-SA', { year: 'numeric', month: 'long' })
    }

    const generatePDF = () => {
      window.print()
    }

    const generateQRCode = async () => {
      try {
        // إنشاء vCard للمعلومات الشخصية
        const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:${formData.fullName || 'الاسم الكامل'}
TITLE:${formData.jobTitle || 'المسمى الوظيفي'}
EMAIL:${formData.email || ''}
TEL:${formData.phone || ''}
ADR:;;${formData.address || ''};;;;
NOTE:${formData.summary || ''}
END:VCARD`

        const qrCodeDataUrl = await QRCode.toDataURL(vCardData, {
          width: 200,
          margin: 2,
          color: {
            dark: '#2563eb',
            light: '#ffffff'
          }
        })
        
        setQrCodeUrl(qrCodeDataUrl)
      } catch (error) {
        console.error('خطأ في إنشاء الرمز الشريطي:', error)
        alert('حدث خطأ في إنشاء الرمز الشريطي')
      }
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">معاينة السيرة الذاتية</h3>
          <div className="flex gap-2">
            <Button onClick={generateQRCode} variant="outline" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              إنشاء رمز شريطي
            </Button>
            <Button onClick={generatePDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              تحميل PDF
            </Button>
          </div>
        </div>
        <div id="cv-preview" className="bg-white shadow-lg rounded-lg print:shadow-none print:rounded-none overflow-hidden">
          {/* Header */}
          <div className="cv-header">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2 fade-in">
                  {formData.fullName || 'الاسم الكامل'}
                </h1>
                <h2 className="text-xl mb-4 opacity-90 slide-in">
                  {formData.jobTitle || 'المسمى الوظيفي'}
                </h2>
                <div className="space-y-2 text-white/90">
                  {formData.email && (
                    <p className="flex items-center gap-2">
                      <span>📧</span> {formData.email}
                    </p>
                  )}
                  {formData.phone && (
                    <p className="flex items-center gap-2">
                      <span>📱</span> {formData.phone}
                    </p>
                  )}
                  {formData.address && (
                    <p className="flex items-center gap-2">
                      <span>📍</span> {formData.address}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-4">
                {formData.profileImage && (
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                    <img 
                      src={URL.createObjectURL(formData.profileImage)} 
                      alt="الصورة الشخصية"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {qrCodeUrl && (
                  <div className="qr-code-container bg-white/10 backdrop-blur-sm">
                    <img 
                      src={qrCodeUrl} 
                      alt="رمز QR للمعلومات الشخصية"
                      className="w-24 h-24 mx-auto"
                    />
                    <p className="text-xs text-white/80 text-center mt-2">امسح للحصول على المعلومات</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Professional Summary */}
            {formData.summary && (
              <div className="mb-8 cv-section no-break">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  الملخص المهني
                </h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {formData.summary}
                </p>
              </div>
            )}

            {/* Experience */}
            {formData.experiences.some(exp => exp.company || exp.position) && (
              <div className="mb-8 cv-section">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  الخبرات العملية
                </h3>
                <div className="space-y-6">
                  {formData.experiences.filter(exp => exp.company || exp.position).map((exp, index) => (
                    <div key={index} className="experience-item no-break">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-900">
                          {exp.position || 'المسمى الوظيفي'}
                        </h4>
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                        </span>
                      </div>
                      <p className="text-blue-600 font-semibold mb-3 text-lg">
                        {exp.company || 'اسم الشركة'}
                      </p>
                      {exp.description && (
                        <p className="text-gray-700 leading-relaxed text-justify">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {formData.education.some(edu => edu.institution || edu.degree) && (
              <div className="mb-8 cv-section">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  التعليم والمؤهلات
                </h3>
                <div className="space-y-4">
                  {formData.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
                    <div key={index} className="education-item no-break">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-bold text-gray-900">
                          {edu.degree || 'الدرجة العلمية'} في {edu.field || 'التخصص'}
                        </h4>
                        {edu.graduationYear && (
                          <span className="text-sm text-gray-600 bg-green-100 px-3 py-1 rounded-full">
                            {edu.graduationYear}
                          </span>
                        )}
                      </div>
                      <p className="text-green-600 font-semibold text-lg">
                        {edu.institution || 'المؤسسة التعليمية'}
                      </p>
                      {edu.gpa && (
                        <p className="text-gray-600 mt-1">المعدل التراكمي: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {formData.skills.some(skill => skill.trim()) && (
              <div className="mb-8 cv-section">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  المهارات التقنية والمهنية
                </h3>
                <div className="flex flex-wrap gap-3">
                  {formData.skills.filter(skill => skill.trim()).map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {formData.languages.some(lang => lang.language) && (
              <div className="mb-8 cv-section">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  اللغات
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {formData.languages.filter(lang => lang.language).map((lang, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-900">{lang.language}</span>
                      <span className="language-level">{lang.level || 'جيد'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {formData.certifications.some(cert => cert.name) && (
              <div className="mb-8 cv-section">
                <h3 className="text-xl font-bold text-gray-900 cv-section-title">
                  الشهادات والدورات التدريبية
                </h3>
                <div className="space-y-3">
                  {formData.certifications.filter(cert => cert.name).map((cert, index) => (
                    <div key={index} className="certification-badge">
                      <span>🏆</span>
                      <div className="flex-1">
                        <span className="font-semibold">{cert.name}</span>
                        {cert.issuer && <span className="text-amber-700"> - {cert.issuer}</span>}
                      </div>
                      {cert.date && (
                        <span className="text-sm text-amber-600">
                          {formatDate(cert.date)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPersonalInfo()
      case 1:
        return renderProfessionalInfo()
      case 2:
        return renderExperiences()
      case 3:
        return renderEducation()
      case 4:
        return renderSkillsAndLanguages()
      case 5:
        return renderPreview()
      default:
        return renderPersonalInfo()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            أداة إنشاء السيرة الذاتية الاحترافية
          </h1>
          <p className="text-lg text-gray-600">
            أنشئ سيرتك الذاتية الاحترافية في دقائق معدودة
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    index <= currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep].title}
            </h2>
            <p className="text-gray-600">{steps[currentStep].description}</p>
          </div>
        </div>

        {/* Main Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-right">
              الخطوة {currentStep + 1} من {steps.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            السابق
          </Button>
          
          <Button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            التالي
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App

