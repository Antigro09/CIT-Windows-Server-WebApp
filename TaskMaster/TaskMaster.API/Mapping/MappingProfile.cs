using AutoMapper;
using TaskMaster.API.Models;
using TaskMaster.Core.Entities;

namespace TaskMaster.API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Entity to DTO
            CreateMap<TaskItem, TaskItemDto>();
            
            // DTO to Entity
            CreateMap<CreateTaskDto, TaskItem>()
                .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => TaskStatus.Todo));
                
            CreateMap<UpdateTaskDto, TaskItem>();
        }
    }
}