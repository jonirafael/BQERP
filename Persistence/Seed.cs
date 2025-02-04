using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Items.Any()) return;
            
            var items = new List<Item>
            {
                new Item
                {
                    ItemCode = "Past Item 1",
                    Description = "Item 2 months ago",
                    ItemName = "drinks",
                },
                new Item
                {
                    ItemCode = "Past Item 2",
                    Description = "Item 1 month ago",
                    ItemName = "culture",
                },
                new Item
                {
                    ItemCode = "Future Item 1",
                    Description = "Item 1 month in future",
                    ItemName = "culture",
                },
                new Item
                {
                    ItemCode = "Future Item 2",
                    Description = "Item 2 months in future",
                    ItemName = "music",
                },
                new Item
                {
                    ItemCode = "Future Item 3",
                    Description = "Item 3 months in future",
                    ItemName = "drinks",
                },
                new Item
                {
                    ItemCode = "Future Item 4",
                    Description = "Item 4 months in future",
                    ItemName = "drinks",
                },
                new Item
                {
                    ItemCode = "Future Item 5",
                    Description = "Item 5 months in future",
                    ItemName = "drinks",
                },
                new Item
                {
                    ItemCode = "Future Item 6",
                    Description = "Item 6 months in future",
                    ItemName = "music",
                },
                new Item
                {
                    ItemCode = "Future Item 7",
                    Description = "Item 2 months ago",
                    ItemName = "travel",
                },
                new Item
                {
                    ItemCode = "Future Item 8",
                    Description = "Item 8 months in future",
                    ItemName = "film",
                }
            };

            await context.Items.AddRangeAsync(items);
            await context.SaveChangesAsync();
        }
    }
}