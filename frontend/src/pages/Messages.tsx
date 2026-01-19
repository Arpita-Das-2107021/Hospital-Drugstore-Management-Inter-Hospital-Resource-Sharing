import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EmployeeCard } from '@/components/EmployeeCard';
import { mockConversations, mockMessages, mockEmployees, mockHospitals } from '@/data';
import { Employee } from '@/types/healthcare';
import { useState, useMemo } from 'react';
import { Send, ArrowLeft, Search, Users, MessageCircle, Phone, Mail, Circle, Plus } from 'lucide-react';

type ViewMode = 'hospitals' | 'employees' | 'chat';

const Messages = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [selectedHospital, setSelectedHospital] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [selectedConvo, setSelectedConvo] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [hospitalSearchQuery, setHospitalSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  
  // Filter employees based on selected hospital
  const hospitalEmployees = useMemo(() => {
    return mockEmployees.filter(employee => employee.hospital === selectedHospital);
  }, [selectedHospital]);
  
  // Filter employees based on search and role filter
  const filteredEmployees = useMemo(() => {
    let filtered = hospitalEmployees;
    
    if (searchQuery) {
      filtered = filtered.filter(employee => 
        employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        employee.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (roleFilter !== 'all') {
      filtered = filtered.filter(employee => employee.role === roleFilter);
    }
    
    return filtered;
  }, [hospitalEmployees, searchQuery, roleFilter]);
  
  // Filter hospitals based on search
  const filteredHospitals = useMemo(() => {
    if (!hospitalSearchQuery) return mockHospitals;
    
    return mockHospitals.filter(hospital =>
      hospital.name.toLowerCase().includes(hospitalSearchQuery.toLowerCase()) ||
      hospital.city.toLowerCase().includes(hospitalSearchQuery.toLowerCase()) ||
      hospital.region.toLowerCase().includes(hospitalSearchQuery.toLowerCase()) ||
      hospital.specialties.some(specialty => 
        specialty.toLowerCase().includes(hospitalSearchQuery.toLowerCase())
      )
    );
  }, [hospitalSearchQuery]);
  
  const convoMessages = mockMessages.filter(m => m.conversationId === selectedConvo.id);
  
  const handleHospitalSelect = (hospital: string) => {
    setSelectedHospital(hospital);
    setViewMode('employees');
    setSearchQuery('');
    setRoleFilter('all');
  };
  
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
    setViewMode('chat');
    // Could create a new conversation here or find existing one
    // For now, just show the interface ready for a new chat
  };
  
  const handleBackToHospitals = () => {
    setViewMode('hospitals');
    setSelectedHospital('');
    setSelectedEmployee(null);
    setHospitalSearchQuery('');
  };
  
  const handleBackToEmployees = () => {
    setViewMode('employees');
    setSelectedEmployee(null);
  };
  
  const handleBackToChat = () => {
    setViewMode('chat');
    setSelectedHospital('');
    setSelectedEmployee(null);
    setSearchQuery('');
    setHospitalSearchQuery('');
    setRoleFilter('all');
  };
  
  const handleNewMessage = () => {
    setViewMode('hospitals');
    setSelectedHospital('');
    setSelectedEmployee(null);
    setSearchQuery('');
    setHospitalSearchQuery('');
    setRoleFilter('all');
  };

  // Hospital Selection View
  if (viewMode === 'hospitals') {
    return (
      <AppLayout title="Secure Messaging" subtitle="Hospital Communication Network">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToChat} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Chat
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Select Hospital
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search hospitals by name, city, region, or specialty..." 
                    value={hospitalSearchQuery}
                    onChange={(e) => setHospitalSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredHospitals.map(hospital => (
                  <Card 
                    key={hospital.id} 
                    className="cursor-pointer transition-all hover:shadow-md hover:scale-105 border-2 hover:border-primary/50"
                    onClick={() => handleHospitalSelect(hospital.name)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video rounded-lg bg-cover bg-center mb-3" 
                           style={{ backgroundImage: `url(${hospital.image})` }} />
                      <h3 className="font-semibold text-lg mb-2">{hospital.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{hospital.city}, {hospital.region}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {hospital.specialties.slice(0, 2).map(specialty => (
                          <Badge key={specialty} variant="secondary" className="text-xs">{specialty}</Badge>
                        ))}
                        {hospital.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">+{hospital.specialties.length - 2} more</Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{hospital.beds} beds</span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {mockEmployees.filter(e => e.hospital === hospital.name).length} staff
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredHospitals.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No hospitals found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Employee Selection View
  if (viewMode === 'employees') {
    return (
      <AppLayout 
        title="Hospital Staff" 
        subtitle={`${selectedHospital} - Select team member to chat`}
      >
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={handleBackToHospitals} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Hospitals
            </Button>
            <Button variant="ghost" onClick={handleBackToChat} className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Back to Chat
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search by name, department, or specialization..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
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
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredEmployees.map(employee => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    onSelect={handleEmployeeSelect}
                    onPhone={(emp) => {
                      if (emp.phoneNumber) {
                        window.open(`tel:${emp.phoneNumber}`, '_blank');
                      }
                    }}
                    onEmail={(emp) => {
                      window.open(`mailto:${emp.email}`, '_blank');
                    }}
                  />
                ))}
              </div>
              
              {filteredEmployees.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No staff members found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Chat View (existing functionality enhanced)
  return (
    <AppLayout 
      title="Secure Messaging" 
      subtitle="Case-based communication"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {selectedEmployee && (
              <>
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold">
                    {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                    selectedEmployee.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium">{selectedEmployee.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedEmployee.department} • {selectedEmployee.hospital}</p>
                </div>
              </>
            )}
          </div>
          <Button onClick={handleNewMessage} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Message
          </Button>
        </div>
        
        <div className="grid h-[calc(100vh-16rem)] gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Conversations
                </span>
                <Badge variant="secondary">{mockConversations.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-0">
              <ScrollArea className="h-[calc(100%-4rem)]">
                {mockConversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No conversations yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Click "New Message" to start chatting</p>
                  </div>
                ) : (
                  mockConversations.map(convo => (
                    <div key={convo.id} onClick={() => setSelectedConvo(convo)} className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted ${selectedConvo.id === convo.id ? 'bg-muted' : ''}`}>
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{convo.participants[1]?.name}</p>
                        {convo.unreadCount > 0 && <Badge>{convo.unreadCount}</Badge>}
                      </div>
                      {convo.caseTag && <Badge variant="outline" className="mt-1">{convo.caseTag}</Badge>}
                      <p className="mt-2 text-sm text-muted-foreground line-clamp-1">{convo.lastMessage}</p>
                    </div>
                  ))
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          
          <Card className="lg:col-span-2 flex flex-col">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium flex items-center gap-2">
                    {selectedConvo.participants[1]?.name}
                    <Circle className="h-2 w-2 fill-green-500 text-green-500" />
                  </h3>
                  <p className="text-sm text-muted-foreground">{selectedConvo.participants[1]?.hospital}</p>
                </div>
                <div className="flex items-center gap-2">
                  {selectedConvo.caseTag && <Badge variant="outline">{selectedConvo.caseTag}</Badge>}
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {selectedEmployee && !convoMessages.length ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-2xl mx-auto mb-4">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="font-medium text-lg mb-2">Start a conversation with {selectedEmployee.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{selectedEmployee.department} • {selectedEmployee.hospital}</p>
                    <p className="text-xs text-muted-foreground">Send a message to begin your conversation</p>
                  </div>
                ) : (
                  convoMessages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender.id === '1' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 ${msg.sender.id === '1' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className="mt-1 text-xs opacity-70">{new Date(msg.createdAt).toLocaleTimeString()}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type a message..." 
                  value={newMessage} 
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      // Handle send message
                      if (newMessage.trim()) {
                        setNewMessage('');
                      }
                    }
                  }}
                />
                <Button disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;