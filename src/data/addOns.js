const addOns = [
  {
    id: "extra-driver",
    name: "Extra Driver",
    priceType: "flat",
    price: 1500,
    description: "Add an additional authorized driver for the whole rental period.",
  },
  {
    id: "child-seat",
    name: "Child Seat",
    priceType: "perDay",
    price: 300,
    description: "Safety-certified child seat, charged per rental day.",
  },
  {
    id: "gps",
    name: "GPS Navigation",
    priceType: "perDay",
    price: 200,
    description: "Turn-by-turn GPS navigation device, charged per rental day.",
  },
  {
    id: "insurance",
    name: "Insurance Upgrade",
    priceType: "perDay",
    price: 800,
    description: "Full damage coverage with a reduced security deposit, charged per rental day.",
  },
];

export function calculateAddOnCost(addOn, totalDays) {
  if (addOn.priceType === "flat") return addOn.price;
  return addOn.price * Math.max(totalDays, 1);
}

export default addOns;