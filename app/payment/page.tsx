{items.map((item) => (
  <div key={item.id} className="flex gap-3">
    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
      <img 
        src={item.image} 
        alt={item.title || item.name || 'Product'}
        className="w-full h-full object-cover"
      />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium truncate">{item.title || item.name}</p>
      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
      <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
    </div>
  </div>
))}