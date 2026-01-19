import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockHospitals, mockSharedResources, mockEmployees, type ResourceWithVisibility } from '@/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResourceCard } from '@/components/ResourceCard';
import { EmployeeCard } from '@/components/EmployeeCard';
import { 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Bed, 
  Phone, 
  Mail, 
  ExternalLink, 
  Package,
  Users,
  Search
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { ResourceRequestForm } from '@/components/ResourceRequestForm';

const HospitalDetails = () => {
  const { hospitalId } = useParams<{ hospitalId: string }>();
  const navigate = useNavigate();
  const [selectedResource, setSelectedResource] = useState<ResourceWithVisibility | null>(null);
  const [isRequestOpen, setIsRequestOpen] = useState(false);
  const [employeeSearchQuery, setEmployeeSearchQuery] = useState('');
  const [employeeRoleFilter, setEmployeeRoleFilter] = useState<string>('all');

  const hospital = mockHospitals.find(h => h.id === hospitalId);
  
  if (!hospital) {
    return (
      <AppLayout title="Hospital Not Found">
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">Hospital not found</h3>
          <p className="text-muted-foreground">The hospital you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/hospitals')} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Hospitals
          </Button>
        </div>
      </AppLayout>
    );
  }

  // Get resources from this hospital
  const hospitalResources = mockSharedResources.filter(
    resource => resource.hospital === hospital.name && resource.isVisibleToOthers
  );

  // Get employees from this hospital
  const hospitalEmployees = mockEmployees.filter(
    employee => employee.hospital === hospital.name
  );

  // Filter employees based on search and role
  const filteredEmployees = useMemo(() => {
    let filtered = hospitalEmployees;
    
    if (employeeSearchQuery) {
      filtered = filtered.filter(employee => 
        employee.name.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(employeeSearchQuery.toLowerCase()) ||
        employee.specialization?.toLowerCase().includes(employeeSearchQuery.toLowerCase())
      );
    }
    
    if (employeeRoleFilter !== 'all') {
      filtered = filtered.filter(employee => employee.role === employeeRoleFilter);
    }
    
    return filtered;
  }, [hospitalEmployees, employeeSearchQuery, employeeRoleFilter]);

  const handleResourceClick = (resource: ResourceWithVisibility) => {
    navigate(`/resource/${resource.id}`);
  };

  const handleRequest = (resource: ResourceWithVisibility) => {
    setSelectedResource(resource);
    setIsRequestOpen(true);
  };

  return (
    <AppLayout title={hospital.name} subtitle={`${hospital.city}, ${hospital.region}`}>
      <div className="space-y-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4"
          data-navigation
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Hospital Header */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Hospital Image and Basic Info */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <div className="relative h-64 sm:h-80">
                <img 
                  src={hospital.image}
                  alt={hospital.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h1 className="text-2xl sm:text-3xl font-bold">{hospital.name}</h1>
                  <div className="flex items-center gap-2 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span>{hospital.address}</span>
                  </div>
                </div>
                <Badge className="absolute top-4 right-4 bg-primary/90">
                  {hospital.region}
                </Badge>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Hospital Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Bed className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{hospital.beds} Beds</p>
                    <p className="text-sm text-muted-foreground">Total capacity</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{hospitalResources.length} Resources</p>
                    <p className="text-sm text-muted-foreground">Available for sharing</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{hospitalEmployees.length} Staff Members</p>
                    <p className="text-sm text-muted-foreground">Healthcare professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{hospital.specialties.length} Specialties</p>
                    <p className="text-sm text-muted-foreground">Areas of expertise</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>contact@{hospital.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full mt-2"
                  onClick={() => navigate(`/hospital/${hospitalId}/profile`)}
                  data-navigation
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  View Trust Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Specialties */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Specialties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hospital.specialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="text-sm">
                  {specialty}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden border h-64 bg-muted relative">
              <img 
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+3b82f6(${hospital.coordinates.lng},${hospital.coordinates.lat})/${hospital.coordinates.lng},${hospital.coordinates.lat},13,0/800x300@2x?access_token=pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNWNvbmNqYzA4ZTQyaXM1YnMyMmJjamgifQ.fake`}
                alt="Hospital location map"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-muted/80">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {hospital.coordinates.lat.toFixed(4)}°, {hospital.coordinates.lng.toFixed(4)}°
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{hospital.address}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resources and Staff Tabs */}
        <Tabs defaultValue="resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="resources">Shared Resources ({hospitalResources.length})</TabsTrigger>
            <TabsTrigger value="employees">Staff Directory ({hospitalEmployees.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Available Shared Resources</CardTitle>
              </CardHeader>
              <CardContent>
                {hospitalResources.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {hospitalResources.map(resource => (
                      <div key={resource.id} onClick={() => handleResourceClick(resource)} data-navigation>
                        <ResourceCard
                          resource={resource}
                          onRequest={handleRequest}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No shared resources</h3>
                    <p className="text-muted-foreground">This hospital hasn't shared any resources yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Staff Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by name, department, or specialization..." 
                      value={employeeSearchQuery}
                      onChange={(e) => setEmployeeSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={employeeRoleFilter} onValueChange={setEmployeeRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="doctor">Doctors</SelectItem>
                      <SelectItem value="nurse">Nurses</SelectItem>
                      <SelectItem value="pharmacist">Pharmacists</SelectItem>
                      <SelectItem value="admin">Administrators</SelectItem>
                      <SelectItem value="coordinator">Coordinators</SelectItem>
                      <SelectItem value="technician">Technicians</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {filteredEmployees.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredEmployees.map(employee => (
                      <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onPhone={(emp) => {
                          if (emp.phoneNumber) {
                            window.open(`tel:${emp.phoneNumber}`, '_blank');
                          }
                        }}
                        onEmail={(emp) => {
                          window.open(`mailto:${emp.email}`, '_blank');
                        }}
                        showActions={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No staff members found</h3>
                    <p className="text-muted-foreground">
                      {employeeSearchQuery || employeeRoleFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria' 
                        : 'No staff directory available for this hospital'
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <ResourceRequestForm
          resource={selectedResource}
          isOpen={isRequestOpen}
          onClose={() => setIsRequestOpen(false)}
        />
      </div>
    </AppLayout>
  );
};

export default HospitalDetails;