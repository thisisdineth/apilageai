
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import TopNavbar from '@/components/layout/TopNavbar';
import Footer from '@/components/layout/Footer';
import ProfileHeader from '@/components/profile/ProfileHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';
import { User, Wallet, CreditCard, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  
  // Extract active tab from URL or use default
  const activeTab = location.pathname.split('/').pop() || 'edit';
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };
  
  // Close sidebar on route change if mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);
  
  // Set sidebar default state based on screen size
  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);
  
  // Example function for buying credits
  const handleBuyCredits = (amount: number) => {
    toast({
      title: "Credits Purchased",
      description: `You've successfully purchased ${amount} credits!`,
      duration: 3000,
    });
  };
  
  // Overlay for mobile sidebar
  const SidebarOverlay = () => (
    isMobile && sidebarOpen ? (
      <div 
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm transition-opacity duration-300"
        onClick={toggleSidebar}
      />
    ) : null
  );
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <TopNavbar toggleSidebar={toggleSidebar} />
      
      {/* Sidebar Overlay */}
      <SidebarOverlay />
      
      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen && !isMobile ? 'ml-64' : isMobile ? 'ml-0' : 'ml-20'}`}>
          <div className="container mx-auto px-4 py-6 animate-fade-in">
            <ProfileHeader />
            
            <div className="mt-24 md:mt-20">
              <Tabs defaultValue={activeTab} className="w-full">
                <TabsList className="mb-6 w-full flex flex-wrap justify-center gap-2">
                  <TabsTrigger value="edit" className="data-[state=active]:bg-apilage-50 data-[state=active]:text-apilage-500">
                    <User className="h-4 w-4 mr-2" />
                    Edit Profile
                  </TabsTrigger>
                  <TabsTrigger value="balance" className="data-[state=active]:bg-apilage-50 data-[state=active]:text-apilage-500">
                    <Wallet className="h-4 w-4 mr-2" />
                    My Balance
                  </TabsTrigger>
                  <TabsTrigger value="credits" className="data-[state=active]:bg-apilage-50 data-[state=active]:text-apilage-500">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Buy Credits
                  </TabsTrigger>
                  <TabsTrigger value="usage" className="data-[state=active]:bg-apilage-50 data-[state=active]:text-apilage-500">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Usage
                  </TabsTrigger>
                </TabsList>
                
                {/* Edit Profile Tab */}
                <TabsContent value="edit" className="animate-fade-in">
                  <Card className="apilage-card">
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Update your account details and profile information</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                            <input 
                              id="name" 
                              type="text" 
                              placeholder="John Doe" 
                              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-apilage-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <input 
                              id="email" 
                              type="email" 
                              placeholder="john@example.com" 
                              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-apilage-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                            <textarea 
                              id="bio" 
                              rows={3}
                              placeholder="Tell us about yourself" 
                              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-apilage-500 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="preferences" className="text-sm font-medium">AI Preferences</label>
                            <select 
                              id="preferences" 
                              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-apilage-500 transition-all"
                            >
                              <option value="creative">Creative</option>
                              <option value="balanced">Balanced</option>
                              <option value="precise">Precise</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-apilage-500 hover:bg-apilage-600">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* My Balance Tab */}
                <TabsContent value="balance" className="animate-fade-in">
                  <Card className="apilage-card">
                    <CardHeader>
                      <CardTitle>Credit Balance</CardTitle>
                      <CardDescription>View your current balance and transaction history</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 rounded-xl p-6 text-center mb-6">
                        <p className="text-sm text-gray-500 mb-1">Available Credits</p>
                        <h2 className="text-4xl font-bold text-apilage-500">1,250</h2>
                        <p className="text-sm text-gray-500 mt-2">Last updated: Today at 12:30 PM</p>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Recent Transactions</h3>
                        <div className="space-y-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                              <div>
                                <p className="font-medium">{i % 2 === 0 ? 'Credit Purchase' : 'Usage'}</p>
                                <p className="text-sm text-gray-500">{new Date(Date.now() - i * 86400000).toLocaleDateString()}</p>
                              </div>
                              <div className={`font-medium ${i % 2 === 0 ? 'text-green-500' : 'text-gray-700'}`}>
                                {i % 2 === 0 ? '+500' : '-50'} credits
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">View All Transactions</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Buy Credits Tab */}
                <TabsContent value="credits" className="animate-fade-in">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { amount: 500, price: '$4.99', popular: false },
                      { amount: 1000, price: '$8.99', popular: true },
                      { amount: 2500, price: '$19.99', popular: false }
                    ].map((plan, i) => (
                      <Card key={i} className={`apilage-card hover-lift ${plan.popular ? 'border-apilage-500 shadow-md' : ''}`}>
                        {plan.popular && (
                          <div className="bg-apilage-500 text-white text-xs font-medium py-1 text-center">
                            MOST POPULAR
                          </div>
                        )}
                        <CardHeader>
                          <CardTitle className="text-center">{plan.amount} Credits</CardTitle>
                          <CardDescription className="text-center text-xl font-bold">{plan.price}</CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                          <p className="text-sm text-gray-500">
                            {plan.amount} messages with Apilage AI
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Valid for 1 year
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            className={`w-full ${plan.popular ? 'bg-apilage-500 hover:bg-apilage-600' : ''}`}
                            onClick={() => handleBuyCredits(plan.amount)}
                          >
                            Buy Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="apilage-card mt-6">
                    <CardHeader>
                      <CardTitle>Enterprise Plans</CardTitle>
                      <CardDescription>Custom plans for teams and businesses</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-500">
                        Need more credits or special features for your team? Our enterprise plans offer
                        flexible pricing, premium support, and custom integrations.
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                {/* Usage Tab */}
                <TabsContent value="usage" className="animate-fade-in">
                  <Card className="apilage-card">
                    <CardHeader>
                      <CardTitle>Usage Statistics</CardTitle>
                      <CardDescription>Monitor your Apilage AI usage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {[
                          { title: 'Messages Sent', value: '1,243', icon: 'messages' },
                          { title: 'Credits Used', value: '750', icon: 'credits' },
                          { title: 'Average Per Day', value: '35', icon: 'average' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                            <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                            <h3 className="text-2xl font-bold">{stat.value}</h3>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Usage Over Time</h3>
                        <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
                          <p className="text-gray-400">Chart showing usage trends would be displayed here</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button variant="outline">Download Report</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Profile;
