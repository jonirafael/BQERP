using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Items
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
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
                var item = await _context.Items.FindAsync(request.Id);

                _context.Remove(item);

                await _context.SaveChangesAsync();
            }
        }
    }
}