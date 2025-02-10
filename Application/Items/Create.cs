using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Create
    {
        public class Command : IRequest
        {
            public Item Item { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Items.Add(request.Item);

                await _context.SaveChangesAsync();
            }
        }
    }
}