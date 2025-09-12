import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Plus, Trash2, Save, Send, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { DashboardLayout } from '@/components/DashboardLayout'
import { ModalPreview } from '@/components/ModalPreview'

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}

interface InvoiceFormData {
  clientName: string
  clientEmail: string
  clientAddress: string
  invoiceNumber: string
  issueDate: string
  dueDate: string
  paymentTerms: string
  notes: string
  items: InvoiceItem[]
}

function NewFacture() {
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, unitPrice: 0, total: 0 }
  ])
  const [includeTax, setIncludeTax] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  const form = useForm<InvoiceFormData>({
    defaultValues: {
      clientName: '',
      clientEmail: '',
      clientAddress: '',
      invoiceNumber: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      paymentTerms: '30',
      notes: '',
      items: items
    }
  })

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      unitPrice: 0,
      total: 0
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value }
        if (field === 'quantity' || field === 'unitPrice') {
          updatedItem.total = updatedItem.quantity * updatedItem.unitPrice
        }
        return updatedItem
      }
      return item
    })
    setItems(updatedItems)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const calculateTax = (subtotal: number) => {
    return subtotal * 0.2 // 20% TVA
  }

  const calculateTotal = () => {
    const subtotal = calculateSubtotal()
    const tax = includeTax ? calculateTax(subtotal) : 0
    return subtotal + tax
  }

  const getInvoiceData = () => {
    const formData = form.getValues()
    const subtotal = calculateSubtotal()
    const tax = includeTax ? calculateTax(subtotal) : 0
    return {
      ...formData,
      items: items,
      subtotal: subtotal,
      tax: tax,
      total: subtotal + tax,
      includeTax: includeTax
    }
  }

  const handlePreview = () => {
    setShowPreview(true)
  }

  const onSubmit = (data: InvoiceFormData) => {
    const invoiceData = getInvoiceData()
    console.log('Données de la facture:', invoiceData)
    // Ici vous pouvez ajouter la logique pour sauvegarder la facture
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900">Nouvelle Facture</h1>
          <p className="text-xs sm:text-base text-gray-600 mt-1 sm:mt-2">Créez une nouvelle facture pour votre client</p>
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Informations du client */}
          <Card className="w-full">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Informations du client</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="clientName"
                rules={{ required: "Le nom du client est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du client *</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom complet du client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientEmail"
                rules={{ 
                  required: "L'email du client est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email invalide"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email du client *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="client@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientAddress"
                rules={{ required: "L'adresse du client est requise" }}
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Adresse du client *</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Adresse complète du client" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Informations de la facture */}
          <Card className="w-full">
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-base sm:text-lg">Informations de la facture</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="invoiceNumber"
                rules={{ required: "Le numéro de facture est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de facture *</FormLabel>
                    <FormControl>
                      <Input placeholder="FAC-2024-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issueDate"
                rules={{ required: "La date d'émission est requise" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'émission *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                rules={{ required: "La date d'échéance est requise" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date d'échéance *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentTerms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conditions de paiement</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="15">15 jours</SelectItem>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="45">45 jours</SelectItem>
                        <SelectItem value="60">60 jours</SelectItem>
                        <SelectItem value="immediate">Paiement immédiat</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Articles de la facture */}
          <Card className="w-full">
            <CardHeader className="pb-3 sm:pb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 w-full">
                <CardTitle className="text-base sm:text-lg">Articles / Services</CardTitle>
                <Button type="button" onClick={addItem} variant="outline" size="sm" className="w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Ajouter un article</span>
                  <span className="sm:hidden">Ajouter</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="w-full">
                <Table className="w-full text-xs sm:text-sm">
                  <TableHeader className="hidden sm:table-header-group">
                    <TableRow>
                      <TableHead className="w-[35%] sm:w-[40%]">Description</TableHead>
                      <TableHead className="w-[15%]">Qté</TableHead>
                      <TableHead className="w-[20%] sm:w-[15%]">Prix unit.</TableHead>
                      <TableHead className="w-[15%]">Total</TableHead>
                      <TableHead className="w-[15%]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id} className="flex flex-col sm:table-row border-b sm:border-0 mb-2 sm:mb-0 bg-white sm:bg-transparent rounded-lg sm:rounded-none shadow sm:shadow-none p-2 sm:p-0">
                        <TableCell className="sm:table-cell flex-1">
                          <span className="font-semibold sm:hidden">Description</span>
                          <Input
                            placeholder="Description de l'article"
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="text-xs sm:text-sm mt-1 sm:mt-0"
                          />
                        </TableCell>
                        <TableCell className="sm:table-cell flex-1">
                          <span className="font-semibold sm:hidden">Qté</span>
                          <Input
                            type="text"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                            className="text-xs sm:text-sm mt-1 sm:mt-0"
                          />
                        </TableCell>
                        <TableCell className="sm:table-cell flex-1">
                          <span className="font-semibold sm:hidden">Prix unit.</span>
                          <Input
                            type="text"
                            min="0"
                            step="0.01"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                            className="text-xs sm:text-sm mt-1 sm:mt-0"
                          />
                        </TableCell>
                        <TableCell className="sm:table-cell flex-1">
                          <span className="font-semibold sm:hidden">Total</span>
                          <div className="font-medium text-xs sm:text-sm mt-1 sm:mt-0">
                            {item.total.toFixed(2)} GNF
                          </div>
                        </TableCell>
                        <TableCell className="sm:table-cell flex-1">
                          <span className="font-semibold sm:hidden">Actions</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                            className="text-destructive hover:bg-destructive/10"
                            aria-label="Supprimer l'article"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Notes et totaux */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <Card className="w-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea 
                          placeholder="Notes additionnelles pour la facture..."
                          className="min-h-[100px] sm:min-h-[120px] text-xs sm:text-sm"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg">Résumé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Sous-total:</span>
                  <span className="font-medium">{calculateSubtotal().toFixed(2)} GNF</span>
                </div>
                
                {/* Toggle TVA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-2 gap-2 sm:gap-0">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="include-tax"
                      checked={includeTax}
                      onCheckedChange={setIncludeTax}
                    />
                    <label htmlFor="include-tax" className="text-xs sm:text-sm font-medium">
                      Inclure la TVA (20%)
                    </label>
                  </div>
                  {includeTax && (
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {calculateTax(calculateSubtotal()).toFixed(2)} GNF
                    </span>
                  )}
                </div>

                {includeTax && (
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>TVA (20%):</span>
                    <span className="font-medium">{calculateTax(calculateSubtotal()).toFixed(2)} GNF</span>
                  </div>
                )}
                
                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between text-base sm:text-lg font-bold">
                    <span>Total:</span>
                    <span>{calculateTotal().toFixed(2)} GNF</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 w-full">
            <Button type="button" variant="outline" onClick={handlePreview} className="w-full sm:w-auto">
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Aperçu</span>
              <span className="sm:hidden">Aperçu</span>
            </Button>
            <Button type="button" variant="outline" className="w-full sm:w-auto">
              <Save className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sauvegarder comme brouillon</span>
              <span className="sm:hidden">Brouillon</span>
            </Button>
            <Button type="submit" className="w-full sm:w-auto">
              <Send className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Créer la facture</span>
              <span className="sm:hidden">Créer</span>
            </Button>
          </div>
        </form>
      </Form>
      </div>

      {/* Modal Preview */}
      <ModalPreview 
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        invoiceData={showPreview ? getInvoiceData() : null}
      />
    </DashboardLayout>
  )
}

export default NewFacture
