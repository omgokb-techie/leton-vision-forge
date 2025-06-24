
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, Eye } from "lucide-react";
import { EstimatesActualsTable } from "@/components/EstimatesActualsTable";
import { CashFlowChart } from "@/components/CashFlowChart";

const Index = () => {
  const [activeView, setActiveView] = useState<"summary" | "detailed">("summary");

  const totalEstimated = 125000;
  const totalActual = 137000;
  const profitability = ((totalActual - totalEstimated) / totalEstimated * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Leton</h1>
                <p className="text-sm text-gray-500">Financial Project Management</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Project Active
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Estimates vs Actuals Summary */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                Estimates vs Actuals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Estimates</span>
                  <span className="text-xl font-bold text-blue-600">
                    €{totalEstimated.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600">Actuals</span>
                  <span className="text-xl font-bold text-green-600">
                    €{totalActual.toLocaleString()}
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Variance</span>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-lg font-bold text-green-600">
                        +{profitability.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Project Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Item Lines</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">8/12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">In Progress</span>
                  <span className="font-semibold text-blue-600">4/12</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full w-2/3"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cash Flow Summary */}
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold text-gray-800">
                Cash Flow Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Month</span>
                  <span className="font-semibold text-green-600">+€12,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Next Month</span>
                  <span className="font-semibold text-blue-600">+€8,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Projected Q1</span>
                  <span className="font-semibold text-green-600">+€45,000</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="estimates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:w-1/2">
            <TabsTrigger value="estimates" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Estimates & Actuals</span>
            </TabsTrigger>
            <TabsTrigger value="cashflow" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Cash Flow</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="estimates" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl font-semibold text-gray-800">
                    Detailed Estimates vs Actuals
                  </CardTitle>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setActiveView("summary")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeView === "summary"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Summary
                    </button>
                    <button
                      onClick={() => setActiveView("detailed")}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeView === "detailed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Detailed
                    </button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <EstimatesActualsTable view={activeView} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Cash Flow Analysis
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Track inflows and outflows to identify potential liquidity challenges
                </p>
              </CardHeader>
              <CardContent>
                <CashFlowChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
